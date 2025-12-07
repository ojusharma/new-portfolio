import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/personal';
import './Hero.css';

const TEXT_SEQUENCE = ['ojus', 'ojusharma', 'ojuuuuus', 'mo salah is goat', 'Ojus Sharma'];

const Hero = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [profileImage, setProfileImage] = useState('/profile.jpeg');
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);
  
  // Runaway box state - random spawn position
  const [boxPos, setBoxPos] = useState(() => ({
    x: Math.random() * (window.innerWidth - 150) + 50,
    y: Math.random() * (window.innerHeight - 200) + 100
  }));
  const [isChasing, setIsChasing] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const [targetCorner, setTargetCorner] = useState(null);
  const boxRef = useRef(null);

  // Get corner positions
  const getCornerPositions = () => {
    const boxWidth = 80;
    const boxHeight = 40;
    const padding = 30;
    return [
      { x: padding, y: padding + 60 }, // top-left
      { x: window.innerWidth - boxWidth - padding, y: padding + 60 }, // top-right
      { x: padding, y: window.innerHeight - boxHeight - padding }, // bottom-left
      { x: window.innerWidth - boxWidth - padding, y: window.innerHeight - boxHeight - padding }, // bottom-right
    ];
  };

  // Choose random corner when chasing starts
  useEffect(() => {
    if (isChasing && !targetCorner && !hasStopped) {
      const corners = getCornerPositions();
      const randomCorner = corners[Math.floor(Math.random() * corners.length)];
      setTargetCorner(randomCorner);
    }
  }, [isChasing, targetCorner, hasStopped]);

  // Handle mouse movement for runaway box
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hasStopped) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const boxWidth = 80;
      const boxHeight = 40;
      const safeDistance = 100;
      
      const boxCenterX = boxPos.x + boxWidth / 2;
      const boxCenterY = boxPos.y + boxHeight / 2;
      
      const dx = mouseX - boxCenterX;
      const dy = mouseY - boxCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < safeDistance) {
        if (!isChasing) {
          setIsChasing(true);
        }
        
        // Move towards target corner if we have one
        if (targetCorner) {
          const toCornerX = targetCorner.x - boxPos.x;
          const toCornerY = targetCorner.y - boxPos.y;
          const distanceToCorner = Math.sqrt(toCornerX * toCornerX + toCornerY * toCornerY);
          
          // Check if reached corner
          if (distanceToCorner < 20) {
            setHasStopped(true);
            setIsChasing(false);
            setBoxPos(targetCorner);
            return;
          }
          
          // Move towards corner
          const moveSpeed = 20;
          const newX = boxPos.x + (toCornerX / distanceToCorner) * moveSpeed;
          const newY = boxPos.y + (toCornerY / distanceToCorner) * moveSpeed;
          
          setBoxPos({ x: newX, y: newY });
        }
      } else {
        if (isChasing) {
          setIsChasing(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [boxPos, isChasing, hasStopped, targetCorner]);

  const handleBoxClick = () => {
    if (hasStopped) {
      navigate('/f1');
    }
  };

  useEffect(() => {
    if (isComplete) {
      return;
    }

    if (loopNum === 3 && !isDeleting && displayText.length === 0) {
      setProfileImage('/mosalah.png');
    } else if (loopNum === 3 && isDeleting && displayText === '') {
      setProfileImage('/profile.jpeg');
    } else if (loopNum < 3) {
      setProfileImage('/profile.jpeg');
    }

    const handleTyping = () => {
      const currentIndex = loopNum % TEXT_SEQUENCE.length;
      const fullText = TEXT_SEQUENCE[currentIndex];

      if (!isDeleting) {
        if (displayText !== fullText) {
          setDisplayText(fullText.substring(0, displayText.length + 1));
        } else {
          if (currentIndex === TEXT_SEQUENCE.length - 1) {
            setIsComplete(true);
            return;
          }
          timerRef.current = setTimeout(() => setIsDeleting(true), 800);
          return;
        }
      } else {
        if (displayText !== '') {
          setDisplayText(fullText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          return;
        }
      }
    };

    const speed = isDeleting ? 40 : 80;
    timerRef.current = setTimeout(handleTyping, speed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [displayText, isDeleting, loopNum, isComplete]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-name">
            {displayText}
            <span className="typewriter-cursor">|</span>
          </h1>
          
          <div className="hero-details">
            <p className="hero-title">{personalInfo.title}</p>
            <p className="hero-university">{personalInfo.university}</p>
            <p className="hero-graduation">{personalInfo.graduation}</p>
          </div>

          <p className="hero-tagline">{personalInfo.tagline}</p>

          <p className="hero-location">{personalInfo.location}</p>
        </div>

        <div className="hero-image">
          <img 
            src={profileImage} 
            alt={displayText || personalInfo.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300/1a1a1a/FFA500?text=Add+Your+Photo';
            }}
          />
        </div>
      </div>

      {isComplete && (
        <div
          ref={boxRef}
          className={`runaway-box ${hasStopped ? 'stopped' : ''} ${isChasing ? 'chasing' : ''} ${!hasStopped ? 'not-clickable' : ''}`}
          style={{
            left: `${boxPos.x}px`,
            top: `${boxPos.y}px`,
          }}
          onClick={handleBoxClick}
        >
          /f1
        </div>
      )}
    </section>
  );
};

export default Hero;
