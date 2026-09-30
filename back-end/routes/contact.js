import express from 'express';
import { sendMessage, getMessages, markRead } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/', getMessages);
router.patch('/:id/read', markRead);

export default router;
