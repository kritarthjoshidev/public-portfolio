import React from 'react';
import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';

const Footer = ({ about }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <a href="#hero" className="footer__logo" onClick={e => {
            e.preventDefault();
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="navbar__logo-bracket">&lt;</span>
            <span className="navbar__logo-name">KJ</span>
            <span className="navbar__logo-bracket"> /&gt;</span>
          </a>

          <p className="footer__copy">
            © {year} {about?.name || 'Kritarth Joshi'}. Designed &amp; built with{' '}
            <FiHeart style={{ color: '#FF6B6B', display: 'inline', verticalAlign: 'middle' }} />
            {' '}using React &amp; Express.
          </p>

          <div className="footer__socials">
            <a href={about?.github || 'https://github.com/kritarthjoshi'} target="_blank" rel="noreferrer">
              <FiGithub />
            </a>
            <a href={about?.linkedin || 'https://linkedin.com/in/kritarthjoshi'} target="_blank" rel="noreferrer">
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
