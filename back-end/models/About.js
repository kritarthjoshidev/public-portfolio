import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  email: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  avatar: { type: String, default: '' },
  experience: [{
    company: String,
    role: String,
    duration: String,
    description: String,
    tech: [String],
  }],
  education: [{
    institution: String,
    degree: String,
    duration: String,
    description: String,
  }],
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
