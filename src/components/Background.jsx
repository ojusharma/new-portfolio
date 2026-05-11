import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollSpeed;
  uniform vec2  uResolution;
  uniform float uBrightness;

  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  shift = vec2(100.0);
    mat2  rot   = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p  = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    float t = uTime * 0.18;

    vec2 mouse = uMouse - 0.5;
    float mouseDist = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.18;

    vec2 q = vec2(
      fbm(uv + vec2(0.0, 0.0) + t * 0.12),
      fbm(uv + vec2(5.2, 1.3) + t * 0.10)
    );

    q += mouse * mouseInfluence;

    vec2 r = vec2(
      fbm(uv + 1.0 * q + vec2(1.7, 9.2) + t * 0.08),
      fbm(uv + 1.0 * q + vec2(8.3, 2.8) + t * 0.06)
    );

    float f = fbm(uv + r);

    vec3 colA = vec3(0.008, 0.018, 0.080);
    vec3 colB = vec3(0.014, 0.036, 0.145);
    vec3 colC = vec3(0.020, 0.052, 0.190);
    vec3 colD = vec3(0.012, 0.018, 0.110);

    vec3 color = mix(colA, colB, clamp(f * f * 4.0, 0.0, 1.0));
        color  = mix(color, colC, clamp(f * f * 2.0, 0.0, 1.0));
        color  = mix(color, colD, clamp(length(q),   0.0, 1.0));

    float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.6);
    color *= vignette * 0.3 + 0.7;

    color *= uBrightness;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function computeTargetBrightness() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  const expEl = document.querySelector('.experience-section');
  const skillsEl = document.querySelector('.skills-section');
  if (!expEl || !skillsEl) return 1.0;

  const expTop = expEl.getBoundingClientRect().top + scrollY;
  const skillsTop = skillsEl.getBoundingClientRect().top + scrollY;

  const fadeOutStart = expTop - vh * 0.6;
  const fadeOutEnd   = expTop + vh * 0.15;
  const fadeInStart  = skillsTop - vh;
  const fadeInEnd    = skillsTop + vh * 0.3;

  if (scrollY <= fadeOutStart) return 1.0;
  if (scrollY <= fadeOutEnd) return 1.0 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart) * 0.6;
  if (scrollY <= fadeInStart) return 0.4;
  if (scrollY <= fadeInEnd)   return 0.4 + (scrollY - fadeInStart) / (fadeInEnd - fadeInStart) * 0.6;
  return 1.0;
}

export default function Background() {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.background =
        'radial-gradient(ellipse at 30% 40%, #0d1a30 0%, #04040e 60%)';
      return;
    }

    const testCanvas = document.createElement('canvas');
    const glTest = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!glTest) {
      document.body.style.background =
        'radial-gradient(ellipse at 30% 40%, #0d1a30 0%, #04040e 60%)';
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'ojus-bg';
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0', left: '0',
      width: '100vw', height: '100vh',
      zIndex: '-1',
      pointerEvents: 'none',
      display: 'block',
    });
    document.body.prepend(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime:        { value: 0 },
      uMouse:       { value: new THREE.Vector2(0.5, 0.5) },
      uScrollSpeed: { value: 0 },
      uResolution:  { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uBrightness:  { value: 1.0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    const targetMouse = { x: 0.5, y: 0.5 };
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let paused = false;
    let rafId;
    let customTime = 0;
    let lastTimestamp = null;
    let targetTimeScale = 1.0;
    let currentTimeScale = 1.0;
    let targetBrightness = computeTargetBrightness();
    let currentBrightness = targetBrightness;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          targetTimeScale = e.isIntersecting ? 0.08 : 1.0;
        });
      },
      { threshold: 0.1 }
    );
    const experienceEl = document.querySelector('.experience-section');
    if (experienceEl) observer.observe(experienceEl);

    const onMouseMove = e => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollVelocity = Math.min(Math.abs(delta) * 0.04, 1.0);
      lastScrollY = window.scrollY;
      targetBrightness = computeTargetBrightness();
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    const onVisibility = () => { paused = document.hidden; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    function tick(timestamp) {
      if (!mountedRef.current) return;
      rafId = requestAnimationFrame(tick);
      if (paused) return;

      const delta = lastTimestamp === null ? 0 : (timestamp - lastTimestamp) * 0.001;
      lastTimestamp = timestamp;

      currentTimeScale += (targetTimeScale - currentTimeScale) * 0.02;
      customTime += delta * currentTimeScale;

      currentBrightness += (targetBrightness - currentBrightness) * 0.03;

      uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.04;
      uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.04;

      scrollVelocity *= 0.92;
      uniforms.uScrollSpeed.value = scrollVelocity;
      uniforms.uTime.value = customTime;
      uniforms.uBrightness.value = currentBrightness;

      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return null;
}
