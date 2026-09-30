import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiMapPin, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const About = ({ about }) => {
  const [ref, inView] = useInView(0.15);

  const stats = [
    { label: 'Projects Built', value: '15+' },
    { label: 'Technologies', value: '20+' },
    { label: 'AI/ML Apps', value: '5+' },
    { label: 'Open Source', value: '10+' },
  ];

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__tag">about me</span>
          <h2 className="section__title">Who I Am</h2>
        </motion.div>

        <div className="about__grid">
          {/* Avatar / visual */}
          <motion.div
            className="about__visual"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about__avatar-wrapper">
              <div className="about__avatar-ring" />
              <div className="about__avatar">
                <span className="about__avatar-initials">KJ</span>
              </div>
              <div className="about__avatar-glow" />
            </div>

            <div className="about__info-card">
              <div className="about__info-item">
                <FiMapPin className="about__info-icon" />
                <span>{about?.location || 'India 🇮🇳'}</span>
              </div>
              <div className="about__info-item">
                <FiMail className="about__info-icon" />
                <a href={`mailto:${about?.email || 'kritarth@example.com'}`}>
                  {about?.email || 'kritarth@example.com'}
                </a>
              </div>
              <div className="about__info-item">
                <FiGithub className="about__info-icon" />
                <a href={about?.github || '#'} target="_blank" rel="noreferrer">GitHub</a>
              </div>
              <div className="about__info-item">
                <FiLinkedin className="about__info-icon" />
                <a href={about?.linkedin || '#'} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="about__headline">
              Full Stack Developer &amp; <span className="text-gradient">AI Enthusiast</span>
            </h3>
            {(about?.bio || '').split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="about__bio">{para}</p>
            ))}

            <div className="about__stats">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="about__stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span className="about__stat-value text-gradient">{s.value}</span>
                  <span className="about__stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="about__actions">
              <a
                className="btn btn--primary"
                href={about?.resumeUrl || '/resume.pdf'}
                download
                target="_blank"
                rel="noreferrer"
              >
                Download Resume ↓
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
