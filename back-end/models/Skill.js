import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  category: { type: String, default: 'Other' }, // Frontend, Backend, AI/ML, DevOps, Other
  level: { type: Number, default: 80 }, // percentage 0-100
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
