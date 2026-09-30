import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cursor = el ? window.getComputedStyle(el).cursor : 'auto';
      setIsPointer(cursor === 'pointer');
    };

    const hide = () => setIsHidden(true);
    const show = () => setIsHidden(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, [x, y]);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`cursor ${isPointer ? 'cursor--pointer' : ''} ${isHidden ? 'cursor--hidden' : ''}`}
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <div
        ref={dotRef}
        className={`cursor__dot ${isHidden ? 'cursor--hidden' : ''}`}
      />
    </>
  );
};

export default Cursor;
