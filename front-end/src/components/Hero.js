import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { SiX } from 'react-icons/si';

const Hero = ({ about }) => {
  const canvasRef = useRef(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const name = about?.name || 'Kritarth Joshi';
  const github = about?.github || 'https://github.com/kritarthjoshi';
  const linkedin = about?.linkedin || 'https://linkedin.com/in/kritarthjoshi';
  const twitter = about?.twitter || 'https://twitter.com/kritarthjoshi';
  const email = about?.email || 'kritarth@example.com';

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Glowing orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__greeting" variants={itemVariants}>
          👋 Hi there, I'm
        </motion.p>

        <motion.h1 className="hero__name" variants={itemVariants}>
          {name.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? 'text-gradient' : ''}>{word} </span>
          ))}
        </motion.h1>

        <motion.div className="hero__typewriter" variants={itemVariants}>
          <TypeAnimation
            sequence={[
              'Full Stack Developer 🚀',
              2000,
              'AI / ML Enthusiast 🤖',
              2000,
              'Open Source Contributor 🌐',
              2000,
              'Problem Solver 💡',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p className="hero__bio" variants={itemVariants}>
          {about?.bio?.split('\n')[0] || 'Building impactful web apps and AI-powered tools that make a difference.'}
        </motion.p>

        <motion.div className="hero__cta" variants={itemVariants}>
          <button
            className="btn btn--primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
            <span className="btn__arrow">→</span>
          </button>
          <button
            className="btn btn--outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div className="hero__socials" variants={itemVariants}>
          <a href={github} target="_blank" rel="noreferrer" className="hero__social-link" title="GitHub">
            <FiGithub />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="hero__social-link" title="LinkedIn">
            <FiLinkedin />
          </a>
          <a href={twitter} target="_blank" rel="noreferrer" className="hero__social-link" title="X (Twitter)">
            <SiX />
          </a>
          <a href={`mailto:${email}`} className="hero__social-link" title="Email">
            <FiMail />
          </a>
        </motion.div>
      </motion.div>

      <motion.button
        className="hero__scroll-btn"
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <FiArrowDown size={20} />
      </motion.button>
    </section>
  );
};

export default Hero;
