import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isFinePointer()) return;
    document.documentElement.classList.add('custom-cursor-active');
    return () => document.documentElement.classList.remove('custom-cursor-active');
  }, []);

  if (!isFinePointer()) return null;
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 });
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, .experience-item')) setHovering(true);
    };
    const onOut = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? '#FFA500' : '#00d9ff'}`,
          backgroundColor: hovering ? 'rgba(255,165,0,0.08)' : 'transparent',
          scale: hovering ? 1.8 : 1,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        transition={{ scale: { type: 'spring', stiffness: 200, damping: 20 } }}
        animate={{ scale: hovering ? 1.8 : 1 }}
      />
      {/* Inner dot — snaps */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          backgroundColor: hovering ? '#FFA500' : '#00d9ff',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
