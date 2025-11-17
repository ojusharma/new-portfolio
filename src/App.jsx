import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Love from './components/Love';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
              </>
            } />
            <Route path="/love" element={<Love />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
