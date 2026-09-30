import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import About from '../models/About.js';

dotenv.config();

const projects = [
  {
    title: 'AI Chat Assistant',
    description: 'A full-stack AI-powered chat application using OpenAI GPT-4, with real-time streaming responses, conversation history, and a beautiful dark UI.',
    tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/kritarthjoshi/ai-chat-assistant',
    live: 'https://ai-chat.demo.com',
    image: '',
    featured: true,
    order: 1,
  },
  {
    title: 'DevConnect – Dev Social Network',
    description: 'A MERN stack social platform for developers to share projects, follow each other, and collaborate. Includes JWT auth, real-time notifications, and file uploads.',
    tech: ['React', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    github: 'https://github.com/kritarthjoshi/devconnect',
    live: 'https://devconnect.demo.com',
    image: '',
    featured: true,
    order: 2,
  },
  {
    title: 'Smart Resume Analyzer',
    description: 'An AI tool that parses resumes, extracts key information using NLP, and provides ATS compatibility scores with improvement suggestions powered by OpenAI.',
    tech: ['Python', 'FastAPI', 'React', 'spaCy', 'OpenAI'],
    github: 'https://github.com/kritarthjoshi/resume-analyzer',
    live: '',
    image: '',
    featured: true,
    order: 3,
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with product management, cart, Stripe payments, order tracking, and admin dashboard.',
    tech: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/kritarthjoshi/ecommerce-platform',
    live: 'https://shop.demo.com',
    image: '',
    featured: false,
    order: 4,
  },
  {
    title: 'Sentiment Analysis Dashboard',
    description: 'Real-time social media sentiment analysis using Twitter API and a fine-tuned BERT model. Interactive charts built with D3.js and React.',
    tech: ['Python', 'React', 'BERT', 'D3.js', 'FastAPI'],
    github: 'https://github.com/kritarthjoshi/sentiment-dashboard',
    live: '',
    image: '',
    featured: false,
    order: 5,
  },
  {
    title: 'Task Manager App',
    description: 'A drag-and-drop Kanban-style task manager with team collaboration, labels, deadlines, and real-time sync via WebSockets.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Framer Motion'],
    github: 'https://github.com/kritarthjoshi/taskmaster',
    live: 'https://taskmaster.demo.com',
    image: '',
    featured: false,
    order: 6,
  },
];

const skills = [
  // Frontend
  { name: 'React.js', icon: 'SiReact', category: 'Frontend', level: 92, order: 1 },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'Frontend', level: 90, order: 2 },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'Frontend', level: 78, order: 3 },
  { name: 'HTML5 & CSS3', icon: 'SiHtml5', category: 'Frontend', level: 95, order: 4 },
  { name: 'Framer Motion', icon: 'SiFramer', category: 'Frontend', level: 80, order: 5 },
  // Backend
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend', level: 88, order: 6 },
  { name: 'Express.js', icon: 'SiExpress', category: 'Backend', level: 85, order: 7 },
  { name: 'Python', icon: 'SiPython', category: 'Backend', level: 82, order: 8 },
  { name: 'FastAPI', icon: 'SiFastapi', category: 'Backend', level: 75, order: 9 },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'Backend', level: 85, order: 10 },
  // AI/ML
  { name: 'OpenAI API', icon: 'SiLangchain', category: 'AI/ML', level: 85, order: 11 },
  { name: 'TensorFlow', icon: 'SiTensorflow', category: 'AI/ML', level: 70, order: 12 },
  { name: 'PyTorch', icon: 'SiPytorch', category: 'AI/ML', level: 68, order: 13 },
  { name: 'LangChain', icon: 'SiLangchain', category: 'AI/ML', level: 72, order: 14 },
  // DevOps
  { name: 'Docker', icon: 'SiDocker', category: 'DevOps', level: 75, order: 15 },
  { name: 'Git & GitHub', icon: 'SiGithub', category: 'DevOps', level: 90, order: 16 },
  { name: 'Vercel', icon: 'SiVercel', category: 'DevOps', level: 85, order: 17 },
  { name: 'AWS', icon: 'SiVercel', category: 'DevOps', level: 65, order: 18 },
];

const aboutData = {
  name: 'Kritarth Joshi',
  tagline: 'Full Stack Developer | AI Enthusiast',
  bio: "I'm a passionate Full Stack Developer and AI Enthusiast who loves building impactful, scalable web applications. I thrive at the intersection of clean code, beautiful design, and intelligent systems — turning complex ideas into elegant, production-ready products.\n\nWith expertise in the MERN stack and AI/ML tools, I build everything from real-time apps and REST APIs to NLP-powered tools and AI chat assistants.",
  location: 'India 🇮🇳',
  email: 'kritarthjoshidev@gmail.com',
  github: 'https://github.com/kritarthjoshidev',
  linkedin: 'https://linkedin.com/in/kritarthjoshi',
  twitter: 'https://twitter.com/kritarthjoshi',
  resumeUrl: '',
  avatar: '',
  experience: [
    {
      company: 'Freelance / Self-Employed',
      role: 'Full Stack Developer & AI Engineer',
      duration: '2022 – Present',
      description: 'Developing full-stack web applications, AI-powered tools, and REST APIs for various clients. Specializing in MERN stack + OpenAI integrations.',
      tech: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenAI API'],
    },
  ],
  education: [
    {
      institution: 'Your University',
      degree: 'B.Tech in Computer Science & Engineering',
      duration: '2020 – 2024',
      description: 'Core studies in DSA, OS, DBMS, Machine Learning, and Software Engineering. Active in hackathons and open-source contributions.',
    },
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany();
    await Skill.deleteMany();
    await About.deleteMany();

    // Insert seed data
    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);

    await Skill.insertMany(skills);
    console.log(`✅ Seeded ${skills.length} skills`);

    await About.create(aboutData);
    console.log('✅ Seeded about data');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
