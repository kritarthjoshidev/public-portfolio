import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiBriefcase, FiBook } from 'react-icons/fi';

const TimelineItem = ({ item, index, inView, type }) => (
  <motion.div
    className="timeline__item"
    initial={{ opacity: 0, x: -40 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <div className="timeline__dot">
      {type === 'experience' ? <FiBriefcase size={14} /> : <FiBook size={14} />}
    </div>
    <div className="timeline__card">
      <div className="timeline__header">
        <div>
          <h3 className="timeline__role">{type === 'experience' ? item.role : item.degree}</h3>
          <p className="timeline__company text-gradient">
            {type === 'experience' ? item.company : item.institution}
          </p>
        </div>
        <span className="timeline__duration">{item.duration}</span>
      </div>
      <p className="timeline__desc">{item.description}</p>
      {type === 'experience' && item.tech?.length > 0 && (
        <div className="timeline__tech">
          {item.tech.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const Experience = ({ about }) => {
  const [ref, inView] = useInView(0.1);
  const [tab, setTab] = useState('experience');

  const experience = about?.experience || [];
  const education = about?.education || [];

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__tag">journey</span>
          <h2 className="section__title">Experience &amp; Education</h2>
        </motion.div>

        <motion.div
          className="experience__tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <button
            className={`experience__tab ${tab === 'experience' ? 'active' : ''}`}
            onClick={() => setTab('experience')}
          >
            <FiBriefcase /> Experience
          </button>
          <button
            className={`experience__tab ${tab === 'education' ? 'active' : ''}`}
            onClick={() => setTab('education')}
          >
            <FiBook /> Education
          </button>
        </motion.div>

        <div className="timeline">
          {(tab === 'experience' ? experience : education).map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              inView={inView}
              type={tab}
            />
          ))}
          {(tab === 'experience' ? experience : education).length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              No {tab} data yet. Add some via the API or database.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
