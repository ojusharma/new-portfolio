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
  
  // F1 box visibility state - appears after 7 seconds
  const [showF1Box, setShowF1Box] = useState(false);

  // Show F1 box after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowF1Box(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleBoxClick = () => {
    navigate('/f1');
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

      {showF1Box && (
        <div
          className="f1-box"
          onClick={handleBoxClick}
        >
          /f1
        </div>
      )}
    </section>
  );
};

export default Hero;
