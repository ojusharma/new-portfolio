import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, ContactShadows, Center, PerspectiveCamera, useProgress, Grid } from "@react-three/drei";
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
  { id: 1, file: '/commentary/commentary1.mp3', context: '2021 Abu Dhabi GP: Max Verstappen beats Hamilton to win his first World Championship.' },
  { id: 2, file: '/commentary/commentary3.mp3', context: '2010 Abu Dhabi GP: "The moment Vettel (my fav) became the youngest World Champion in F1 history at just 23 years old.' },
  { id: 3, file: '/commentary/commentary2.mp3', context: '2024 Monaco GP: Charles Leclerc finally wins his home race after years of heartbreak, becoming the first Monégasque winner since Louis Chiron in 1931.' },
];

const F1Viewer = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentView, setCurrentView] = useState('full');
  const [resetKey, setResetKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCommentary, setCurrentCommentary] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [playedIndices, setPlayedIndices] = useState([]);
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

    // Get available indices (ones that haven't been played)
    let availableIndices = COMMENTARY_DATA.map((_, i) => i).filter(i => !playedIndices.includes(i));
    
    // If all have been played, reset and start over
    if (availableIndices.length === 0) {
      availableIndices = COMMENTARY_DATA.map((_, i) => i);
      setPlayedIndices([]);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const commentary = COMMENTARY_DATA[randomIndex];
    
    // Mark this one as played
    setPlayedIndices(prev => [...prev, randomIndex]);
    
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
  }, [playedIndices]);

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
          f1
        </h1>
        <p className="f1-tagline">my favourite hobby - visualized for you - it's interactive!</p>
      </div>

      <div className="controls-panel">
        <div className="radio-btn-wrapper">
          <span className="sound-warning">This button plays sound</span>
          <button 
            className={`commentary-panel-btn ${isPlaying ? 'active' : ''}`}
            onClick={isPlaying ? stopCommentary : playRandomCommentary}
          >
            {isPlaying ? '⏹ Stop Radio' : 'Play Radio Messages 🎙'}
          </button>
        </div>
      </div>

      <div className="canvas-container">
        <div className="view-buttons">
          <span className="camera-options-label">Camera Options</span>
          <div className="camera-options-dropdown">
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
              opacity={0.4}
              scale={15}
              blur={2.5}
              far={5}
            />
            <Grid
              position={[0, -3.5, 0]}
              args={[100, 100]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#00d9ff"
              sectionSize={3}
              sectionThickness={1}
              sectionColor="#FFA500"
              fadeDistance={50}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
              side={THREE.DoubleSide}
            />
            <Grid
              position={[0, 20, -50]}
              rotation={[Math.PI / 2, 0, 0]}
              args={[100, 100]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#00d9ff"
              sectionSize={3}
              sectionThickness={1}
              sectionColor="#FFA500"
              fadeDistance={50}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
              side={THREE.DoubleSide}
            />
            <Grid
              position={[0, 20, 50]}
              rotation={[Math.PI / 2, 0, 0]}
              args={[100, 100]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#00d9ff"
              sectionSize={3}
              sectionThickness={1}
              sectionColor="#FFA500"
              fadeDistance={50}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
              side={THREE.DoubleSide}
            />
            <Grid
              position={[-50, 20, 0]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              args={[100, 100]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#00d9ff"
              sectionSize={3}
              sectionThickness={1}
              sectionColor="#FFA500"
              fadeDistance={50}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
              side={THREE.DoubleSide}
            />
            <Grid
              position={[50, 20, 0]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              args={[100, 100]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#00d9ff"
              sectionSize={3}
              sectionThickness={1}
              sectionColor="#FFA500"
              fadeDistance={50}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
              side={THREE.DoubleSide}
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
      <footer className="f1-footer">
        <p className="model-credit">
          Model: McLaren MCL39 (2025) • <a href="https://sketchfab.com/3d-models/f1-2025-mclaren-mcl39-c6194270002b401bb25be7e35ab56e34" target="_blank" rel="noopener noreferrer" className="credit-link">View on Sketchfab</a>
        </p>
        <p>© 2025 • Built with More RedBulls & More Passion</p>
      </footer>
    </div>
  );
};

export default F1Viewer;
