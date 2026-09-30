import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { sendContactMessage } from '../api/ProfileDataApi';

const Contact = ({ about }) => {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__tag">contact</span>
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info panel */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3>Let's build something <span className="text-gradient">amazing</span> together</h3>
            <p>
              I'm always open to discussing new opportunities, interesting projects,
              or just having a chat about tech and AI.
            </p>
            <div className="contact__info-items">
              <div className="contact__info-item">
                <div className="contact__info-icon"><FiMail /></div>
                <div>
                  <p className="label">Email</p>
                  <a href={`mailto:${about?.email || 'kritarth@example.com'}`}>
                    {about?.email || 'kritarth@example.com'}
                  </a>
                </div>
              </div>
              <div className="contact__info-item">
                <div className="contact__info-icon"><FiMapPin /></div>
                <div>
                  <p className="label">Location</p>
                  <p>{about?.location || 'India 🇮🇳'}</p>
                </div>
              </div>
            </div>
            <div className="contact__socials">
              <a href={about?.github || '#'} target="_blank" rel="noreferrer" className="contact__social">
                <FiGithub />
              </a>
              <a href={about?.linkedin || '#'} target="_blank" rel="noreferrer" className="contact__social">
                <FiLinkedin />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="form__row">
              <div className="form__group">
                <label htmlFor="contact-name">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Kritarth Joshi"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form__group">
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Project collaboration / Say hi"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project or idea..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === 'success' && (
              <div className="form__success">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form__error">❌ {errorMsg}</div>
            )}

            <motion.button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'loading' ? (
                <><span className="spinner" /> Sending...</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
