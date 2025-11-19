import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', createContactMessage);

// Protected routes (require authentication)
router.get('/', protect, getContactMessages);
router.get('/:id', protect, getContactMessage);
router.put('/:id', protect, updateContactMessage);
router.delete('/:id', protect, authorize('admin'), deleteContactMessage);

export default router;
