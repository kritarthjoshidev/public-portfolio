import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <a href="#hero" className="navbar__logo" onClick={() => handleNav('#hero')}>
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-name">KJ</span>
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                className={`navbar__link ${active === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={() => handleNav(link.href)}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span className="navbar__link-underline" layoutId="nav-underline" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <a
          className="btn btn--outline btn--sm navbar__resume"
          href="/resume.pdf"
          download
          target="_blank"
          rel="noreferrer"
        >
          <FiDownload /> Resume
        </a>

        <button className="navbar__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    className={`navbar__mobile-link ${active === link.href.slice(1) ? 'active' : ''}`}
                    onClick={() => handleNav(link.href)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a className="btn btn--outline" href="/resume.pdf" download>
                  <FiDownload /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
