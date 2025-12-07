import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Love from './components/Love';
import F1Viewer from './components/F1Viewer';
import './App.css';

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
  
  return (
    <div className="app">
      {!isLovePage && <Navbar />}
      <ScrollToHash />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/love" element={<Love />} />
          <Route path="/f1" element={<F1Viewer />} />
        </Routes>
      </main>
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
