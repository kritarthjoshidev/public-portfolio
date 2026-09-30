import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import {
  SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiPython,
  SiMongodb, SiExpress, SiDocker, SiGithub, SiTensorflow,
  SiHtml5, SiCss, SiFramer, SiVercel,
  SiPytorch, SiFastapi, SiLangchain,
} from 'react-icons/si';

const iconMap = {
  SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiPython,
  SiMongodb, SiExpress, SiDocker, SiGithub, SiTensorflow,
  SiHtml5, SiCss, SiFramer, SiVercel,
  SiPytorch, SiFastapi, SiLangchain,
};

const categoryColors = {
  Frontend: '#61DAFB',
  Backend: '#68A063',
  'AI/ML': '#FF6B6B',
  DevOps: '#F7B731',
  Other: '#8B5CF6',
};

const Skills = ({ skills }) => {
  const [ref, inView] = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={28} /> : <span style={{ fontSize: 24 }}>⚡</span>;
  };

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__tag">skills</span>
          <h2 className="section__title">Tech Stack</h2>
          <p className="section__subtitle">
            Tools and technologies I use to build production-grade applications
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="skills__filter"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`skills__filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat && cat !== 'All' ? { borderColor: categoryColors[cat], color: categoryColors[cat] } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="skills__grid">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill._id || skill.name}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.07, y: -5 }}
            >
              <div
                className="skill-card__icon"
                style={{ color: categoryColors[skill.category] || '#8B5CF6' }}
              >
                {getIcon(skill.icon)}
              </div>
              <p className="skill-card__name">{skill.name}</p>
              <div className="skill-card__bar">
                <motion.div
                  className="skill-card__fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.04, ease: 'easeOut' }}
                  style={{ backgroundColor: categoryColors[skill.category] || '#8B5CF6' }}
                />
              </div>
              <span className="skill-card__level">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
