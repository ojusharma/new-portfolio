import React, { useEffect, Component, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Love from './components/Love';
import CustomCursor from './components/animations/CustomCursor';
import Background from './components/Background';
import './App.css';

const F1Viewer = lazy(() => import('./components/F1Viewer'));

class CursorErrorBoundary extends Component {
  componentDidCatch() {
    document.documentElement.classList.remove('custom-cursor-active');
  }
  render() {
    return this.props.children;
  }
}

function ScrollToHash() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  
  return null;
}

function AppContent() {
  const location = useLocation();
  const isLovePage = location.pathname === '/love';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;
    const preload = () => fetch('/f1-2025_mclaren_mcl39.glb', { priority: 'low' });
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preload, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(preload, 3000);
      return () => clearTimeout(id);
    }
  }, [isHomePage]);

  return (
    <div className="app">
      <Background />
      <CursorErrorBoundary><CustomCursor /></CursorErrorBoundary>
      {!isLovePage && <Navbar />}
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Routes location={location}>
            <Route path="/" element={
              <>
                <Hero />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/love" element={<Love />} />
            <Route path="/f1" element={
              <Suspense fallback={null}>
                <F1Viewer />
              </Suspense>
            } />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
