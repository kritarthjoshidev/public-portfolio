import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const IntroAnimation = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);
  const panelTopRef = useRef(null);
  const panelBotRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Counter animation 0 → 100
    let count = { val: 0 };
    tl.to(count, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(count.val) + '%';
        }
      }
    }, 0);

    // Progress bar grows
    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0);

    // Text reveal letter by letter
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      0.3
    );

    // Text exits
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      filter: 'blur(8px)',
      duration: 0.5,
      ease: 'power2.in',
    }, 1.9);

    // Curtain splits — top panel flies up, bottom panel flies down
    tl.to(panelTopRef.current, {
      y: '-100%',
      duration: 0.9,
      ease: 'power4.inOut',
    }, 2.1);

    tl.to(panelBotRef.current, {
      y: '100%',
      duration: 0.9,
      ease: 'power4.inOut',
    }, 2.1);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="intro" ref={overlayRef}>
      {/* Top curtain panel */}
      <div className="intro__panel intro__panel--top" ref={panelTopRef} />
      {/* Bottom curtain panel */}
      <div className="intro__panel intro__panel--bot" ref={panelBotRef} />

      {/* Center content */}
      <div className="intro__center">
        <div className="intro__text" ref={textRef}>
          <span className="intro__logo">
            <span className="intro__logo-bracket">&lt;</span>
            <span className="intro__logo-name">KJ</span>
            <span className="intro__logo-bracket"> /&gt;</span>
          </span>
          <p className="intro__tagline">Full Stack Developer · AI Enthusiast</p>
        </div>

        <div className="intro__progress-wrap">
          <div className="intro__progress-bar">
            <div className="intro__progress-fill" ref={progressRef} />
          </div>
          <span className="intro__counter" ref={counterRef}>0%</span>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
