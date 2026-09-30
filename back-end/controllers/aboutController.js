import About from '../models/About.js';

// Seed data for Kritarth Joshi
const defaultAbout = {
  name: 'Kritarth Joshi',
  tagline: 'Full Stack Developer | AI Enthusiast',
  bio: "I'm a passionate Full Stack Developer and AI Enthusiast who loves building impactful, scalable web applications. I thrive at the intersection of clean code, beautiful design, and intelligent systems — turning ideas into production-ready products.",
  location: 'India',
  email: 'kritarth@example.com',
  github: 'https://github.com/kritarthjoshi',
  linkedin: 'https://linkedin.com/in/kritarthjoshi',
  twitter: 'https://twitter.com/kritarthjoshi',
  resumeUrl: '',
  avatar: '',
  experience: [
    {
      company: 'Self-Employed / Freelance',
      role: 'Full Stack Developer',
      duration: '2022 – Present',
      description: 'Building full-stack web applications and AI-integrated tools for clients across various domains.',
      tech: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenAI API'],
    },
  ],
  education: [
    {
      institution: 'Your University',
      degree: 'B.Tech / B.E. in Computer Science',
      duration: '2020 – 2024',
      description: 'Focused on software engineering, machine learning, and data structures.',
    },
  ],
};

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(defaultAbout);
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
