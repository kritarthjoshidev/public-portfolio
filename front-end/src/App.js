import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import IntroAnimation from './components/IntroAnimation';
import { fetchAbout, fetchProjects, fetchSkills } from './api/ProfileDataApi';
import './index.css';

// ── Fallback data (used when backend is not connected) ──────────────────────
const fallbackAbout = {
  name: 'Kritarth Joshi',
  tagline: 'Full Stack Developer | AI Enthusiast',
  bio: "I'm a passionate Full Stack Developer and AI Enthusiast who loves building impactful, scalable web applications. I thrive at the intersection of clean code, beautiful design, and intelligent systems — turning complex ideas into production-ready products.\n\nWith expertise in the MERN stack and AI/ML tools, I build everything from real-time apps and REST APIs to NLP-powered tools and AI chat assistants.",
  location: 'India 🇮🇳',
  email: 'kritarthjoshidev@gmail.com',
  github: 'https://github.com/kritarthjoshidev',
  linkedin: 'https://linkedin.com/in/kritarthjoshi',
  twitter: 'https://twitter.com/kritarthjoshi',
  resumeUrl: '',
  experience: [
    {
      company: 'Freelance / Self-Employed',
      role: 'Full Stack Developer & AI Engineer',
      duration: '2022 – Present',
      description: 'Building full-stack web applications, AI-powered tools, and REST APIs. Specializing in MERN stack + OpenAI integrations.',
      tech: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenAI API'],
    },
  ],
  education: [
    {
      institution: 'Your University',
      degree: 'B.Tech in Computer Science & Engineering',
      duration: '2020 – 2024',
      description: 'Core studies in DSA, OS, DBMS, Machine Learning, and Software Engineering.',
    },
  ],
};

const fallbackProjects = [
  { _id: '1', title: 'AI Chat Assistant', description: 'A full-stack AI-powered chat application using OpenAI GPT-4, with real-time streaming responses, conversation history, and a beautiful dark UI.', tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB'], github: 'https://github.com/kritarthjoshidev', live: '', featured: true, order: 1 },
  { _id: '2', title: 'DevConnect – Dev Social Network', description: 'A MERN stack social platform for developers to share projects, follow each other, and collaborate. Includes JWT auth and real-time notifications.', tech: ['React', 'Express', 'MongoDB', 'JWT'], github: 'https://github.com/kritarthjoshidev', live: '', featured: true, order: 2 },
  { _id: '3', title: 'Smart Resume Analyzer', description: 'An AI tool that parses resumes, extracts key information using NLP, and provides ATS compatibility scores powered by OpenAI.', tech: ['Python', 'FastAPI', 'React', 'OpenAI'], github: 'https://github.com/kritarthjoshidev', live: '', featured: true, order: 3 },
  { _id: '4', title: 'E-Commerce Platform', description: 'Full-featured e-commerce platform with product management, cart, Stripe payments, and an admin dashboard.', tech: ['React', 'Redux', 'Node.js', 'Stripe'], github: 'https://github.com/kritarthjoshidev', live: '', featured: false, order: 4 },
  { _id: '5', title: 'Sentiment Analysis Dashboard', description: 'Real-time social media sentiment analysis using a fine-tuned BERT model. Interactive charts with React and D3.js.', tech: ['Python', 'React', 'BERT', 'D3.js'], github: 'https://github.com/kritarthjoshidev', live: '', featured: false, order: 5 },
  { _id: '6', title: 'Task Manager App', description: 'A drag-and-drop Kanban-style task manager with team collaboration, labels, deadlines, and real-time sync via WebSockets.', tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'], github: 'https://github.com/kritarthjoshidev', live: '', featured: false, order: 6 },
];

const fallbackSkills = [
  { _id: 's1', name: 'React.js', icon: 'SiReact', category: 'Frontend', level: 92 },
  { _id: 's2', name: 'JavaScript', icon: 'SiJavascript', category: 'Frontend', level: 90 },
  { _id: 's3', name: 'TypeScript', icon: 'SiTypescript', category: 'Frontend', level: 78 },
  { _id: 's4', name: 'HTML5 & CSS3', icon: 'SiHtml5', category: 'Frontend', level: 95 },
  { _id: 's5', name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend', level: 88 },
  { _id: 's6', name: 'Express.js', icon: 'SiExpress', category: 'Backend', level: 85 },
  { _id: 's7', name: 'Python', icon: 'SiPython', category: 'Backend', level: 82 },
  { _id: 's8', name: 'MongoDB', icon: 'SiMongodb', category: 'Backend', level: 85 },
  { _id: 's9', name: 'OpenAI API', icon: 'SiLangchain', category: 'AI/ML', level: 85 },
  { _id: 's10', name: 'TensorFlow', icon: 'SiTensorflow', category: 'AI/ML', level: 70 },
  { _id: 's11', name: 'PyTorch', icon: 'SiPytorch', category: 'AI/ML', level: 68 },
  { _id: 's12', name: 'FastAPI', icon: 'SiFastapi', category: 'AI/ML', level: 72 },
  { _id: 's13', name: 'Docker', icon: 'SiDocker', category: 'DevOps', level: 75 },
  { _id: 's14', name: 'Git & GitHub', icon: 'SiGithub', category: 'DevOps', level: 90 },
  { _id: 's15', name: 'Vercel', icon: 'SiVercel', category: 'DevOps', level: 85 },
];

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [aboutRes, projectsRes, skillsRes] = await Promise.allSettled([
          fetchAbout(),
          fetchProjects(),
          fetchSkills(),
        ]);

        setAbout(aboutRes.status === 'fulfilled' ? aboutRes.value.data.data : fallbackAbout);
        setProjects(projectsRes.status === 'fulfilled' ? projectsRes.value.data.data : fallbackProjects);
        setSkills(skillsRes.status === 'fulfilled' ? skillsRes.value.data.data : fallbackSkills);
      } catch {
        setAbout(fallbackAbout);
        setProjects(fallbackProjects);
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="app">
      {/* GSAP Intro Animation — shows once on load */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      <Cursor />
      <Navbar />
      <main>
        <Hero about={about} />
        <About about={about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience about={about} />
        <Contact about={about} />
      </main>
      <Footer about={about} />
      <Analytics />
    </div>
  );
}

export default App;
