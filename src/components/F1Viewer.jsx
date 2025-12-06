import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, ContactShadows, Center, PerspectiveCamera, useProgress } from '@react-three/drei';
import './F1Viewer.css';

function F1Car({ isRotating, resetRotation }) {
  const group = useRef();
  const { scene } = useGLTF('/f1-2025_mclaren_mcl39.glb');
  
  useEffect(() => {
    if (group.current && resetRotation) {
      group.current.rotation.y = 0;
    }
  }, [resetRotation]);
  
  useFrame(() => {
    if (group.current && isRotating) {
      group.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <Center>
      <group ref={group} dispose={null}>
        <primitive object={scene} scale={600} />
      </group>
    </Center>
  );
}

useGLTF.preload('/f1-2025_mclaren_mcl39.glb');

function Loader() {
  const { progress } = useProgress();
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html center>
      <div className="loader">
        <span className="loader-text">Loading McLaren MCL39{dots}</span>
        <div className="loader-progress-bar">
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="loader-percent">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

function CameraController({ view, controlsRef }) {
  const { camera } = useThree();
  
  useEffect(() => {
    if (view && CAMERA_VIEWS[view]) {
      const { position, target } = CAMERA_VIEWS[view];
      camera.position.set(...position);
      camera.updateProjectionMatrix();
      if (controlsRef.current) {
        controlsRef.current.target.set(...target);
        controlsRef.current.update();
      }
    }
  }, [view, camera, controlsRef]);
  
  return null;
}

const CAMERA_VIEWS = {
  full: { position: [-20.70, 16.29, 19.68], target: [0.46, -1.82, 1.05] },
  driver: { position: [-0.03, 1.05, -1.37], target: [0.08, 0.75, 0.66] },
  front: { position: [-0.26, 5.41, 26.05], target: [0.22, -2.69, 0.89] },
  side: { position: [20.05, 0.80, 1.31], target: [0, 0, 0] },
  reset: { position: [-20.70, 16.29, 19.68], target: [0.46, -1.82, 1.05] },
};

const COMMENTARY_DATA = [
  { id: 3, file: '/commentary/commentary2.mp3', context: '2024 Monaco GP: Charles Leclerc finally wins his home race after years of heartbreak, becoming the first Monégasque winner since Louis Chiron in 1931.' },
  { id: 2, file: '/commentary/commentary3.mp3', context: '2010 Abu Dhabi GP: "The moment Vettel (my fav) became the youngest World Champion in F1 history at just 23 years old.' },
  { id: 1, file: '/commentary/commentary1.mp3', context: '2021 Abu Dhabi GP: Max Verstappen beats Hamilton to win his first World Championship.' },
];

const F1Viewer = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentView, setCurrentView] = useState('full');
  const [resetKey, setResetKey] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCommentary, setCurrentCommentary] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const controlsRef = useRef();
  const audioRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playRandomCommentary = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const randomIndex = Math.floor(Math.random() * COMMENTARY_DATA.length);
    const commentary = COMMENTARY_DATA[randomIndex];
    
    const audio = new Audio(commentary.file);
    audioRef.current = audio;
    
    setCurrentCommentary(commentary);
    setShowPopup(true);
    setIsPlaying(true);

    audio.play().catch(err => {
      console.error('Audio playback failed:', err);
      setIsPlaying(false);
      setShowPopup(false);
    });

    audio.onended = () => {
      setIsPlaying(false);
      setShowPopup(false);
      setCurrentCommentary(null);
      audioRef.current = null;
    };
  }, []);

  const stopCommentary = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setShowPopup(false);
    setCurrentCommentary(null);
  }, []);
  
  const handleViewChange = (view) => {
    setCurrentView(view);
    setResetKey(prev => prev + 1);
    if (view !== 'reset') {
      setAutoRotate(false);
    } else {
      setAutoRotate(true);
    }
  };

  return (
    <div className="f1-viewer-page">
      <div className="f1-header">
        <h1 className="f1-title">
          <span className="section-symbol">/</span>f1-viewer
        </h1>
        <p className="f1-subtitle">McLaren MCL39 - 2025 F1 Car</p>
        <p className="f1-tagline">My favourite hobby, visualized for you :)</p>
      </div>

      <div className="canvas-container">
        <div className="view-buttons">
          <button 
            className={`view-btn ${currentView === 'full' ? 'active' : ''}`}
            onClick={() => handleViewChange('full')}
          >
            Full Car
          </button>
          <button 
            className={`view-btn ${currentView === 'driver' ? 'active' : ''}`}
            onClick={() => handleViewChange('driver')}
          >
            Driver POV
          </button>
          <button 
            className={`view-btn ${currentView === 'front' ? 'active' : ''}`}
            onClick={() => handleViewChange('front')}
          >
            Front View
          </button>
          <button 
            className={`view-btn ${currentView === 'side' ? 'active' : ''}`}
            onClick={() => handleViewChange('side')}
          >
            Side View
          </button>
          <button 
            className="view-btn reset-btn"
            onClick={() => handleViewChange('reset')}
          >
            Reset
          </button>
          <button 
            className={`view-btn ${autoRotate ? 'active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? '⏸ Pause' : '▶ Rotate'}
          </button>
        </div>

        {showPopup && currentCommentary && (
          <div className="commentary-popup">
            <div className="commentary-popup-content">
              <span className="commentary-icon">🎙</span>
              <p className="commentary-text">{currentCommentary.context}</p>
              <button className="commentary-close" onClick={stopCommentary}>×</button>
            </div>
          </div>
        )}

        <Canvas
          shadows
          gl={{ antialias: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <PerspectiveCamera makeDefault position={[-20.70, 16.29, 19.68]} fov={45} />
          <color attach="background" args={['#0a0a0a']} />
          <ambientLight intensity={1} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={3}
            castShadow
          />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
          />
          <pointLight position={[0, 10, 0]} intensity={1} />
          
          <Suspense fallback={<Loader />}>
            <F1Car isRotating={autoRotate && !isPlaying} resetRotation={resetKey} />
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.6}
              scale={15}
              blur={2.5}
              far={5}
            />
            <Environment preset="city" />
          </Suspense>
          
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.5}
            maxDistance={100}
          />
          <CameraController view={currentView} controlsRef={controlsRef} />
        </Canvas>
      </div>

      <div className="controls-panel">
        <div className={`control-group instructions ${controlsOpen ? 'open' : ''}`}>
          <h3 className="control-title" onClick={() => setControlsOpen(!controlsOpen)}>
            <span className="collapse-icon">{controlsOpen ? '▼' : '▶'}</span>
            $ cat controls.txt
          </h3>
          {controlsOpen && (
            <ul className="instructions-list">
              <li><span className="key">Drag</span> Rotate camera</li>
              <li><span className="key">Scroll</span> Zoom in/out</li>
              <li><span className="key">Right-drag</span> Pan view</li>
            </ul>
          )}
        </div>

        <button 
          className={`commentary-panel-btn ${isPlaying ? 'active' : ''}`}
          onClick={isPlaying ? stopCommentary : playRandomCommentary}
        >
          {isPlaying ? '⏹ Stop Commentary' : 'Play Commentary 🎙'}
        </button>

        <div className={`control-group ${infoOpen ? 'open' : ''}`}>
          <h3 className="control-title" onClick={() => setInfoOpen(!infoOpen)}>
            <span className="collapse-icon">{infoOpen ? '▼' : '▶'}</span>
            $ cat info.txt
          </h3>
          {infoOpen && (
            <p className="model-credit">
              Model: McLaren MCL39 (2025)<br />
              <a href="https://sketchfab.com/3d-models/f1-2025-mclaren-mcl39-75101b4aefc54b9cb0b670d6f016f0dd" target="_blank" rel="noopener noreferrer" className="credit-link">
                View on Sketchfab →
              </a>
            </p>
          )}
        </div>
      </div>
      <footer className="f1-footer">
        <p>© 2025 • Built with More RedBulls & More Passion</p>
      </footer>
    </div>
  );
};

export default F1Viewer;
