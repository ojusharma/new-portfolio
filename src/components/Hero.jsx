import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/personal';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const [profileImage, setProfileImage] = useState('/profile.jpeg');
  const [isComplete, setIsComplete] = useState(false);

  // Sequence: ojus -> ojusharma -> ojuuuuus -> mo salah is goat -> Ojus Sharma (final)
  const textSequence = ['ojus', 'ojusharma', 'ojuuuuus', 'mo salah is goat', 'Ojus Sharma'];
  const finalText = 'Ojus Sharma';

  useEffect(() => {
    // Change profile image when starting to type "mo salah is goat"
    if (loopNum === 3 && !isDeleting && displayText.length === 0) {
      setProfileImage('/mosalah.png');
    } else if (loopNum === 3 && isDeleting && displayText === '') {
      // After deleting "mo salah is goat", change back to profile.jpeg
      setProfileImage('/profile.jpeg');
    } else if (loopNum < 3) {
      // Ensure profile.jpeg is shown for the first 3 iterations
      setProfileImage('/profile.jpeg');
    }

    const handleTyping = () => {
      const currentIndex = loopNum % textSequence.length;
      const fullText = textSequence[currentIndex];

      if (!isDeleting) {
        // Typing
        if (displayText !== fullText) {
          setDisplayText(fullText.substring(0, displayText.length + 1));
          setTypingSpeed(80);
        } else {
          // Finished typing
          // If this is the last item (Ojus Sharma), don't delete
          if (currentIndex === textSequence.length - 1) {
            setIsComplete(true);
            return;
          }
          // Otherwise, wait before deleting
          setTimeout(() => setIsDeleting(true), 800);
          return;
        }
      } else {
        // Deleting
        if (displayText !== '') {
          setDisplayText(fullText.substring(0, displayText.length - 1));
          setTypingSpeed(40);
        } else {
          // Finished deleting
          setIsDeleting(false);
          
          if (currentIndex === textSequence.length - 1) {
            // After last item, mark as complete
            setIsComplete(true);
            return;
          } else {
            setLoopNum(loopNum + 1);
          }
        }
      }
    };

    // Don't continue if we've reached completion
    if (isComplete) {
      return;
    }

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-name">
            {displayText}
            <span className="typewriter-cursor">|</span>
          </h1>
          
          <marquee behavior="" direction=""><div className="hero-details">
            <p className="hero-title">{personalInfo.title}</p>
            <p className="hero-university">{personalInfo.university}</p>
            <p className="hero-graduation">{personalInfo.graduation}</p>
          </div>
          </marquee>

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
    </section>
  );
};

export default Hero;
