import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry
} from '../controllers/enquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', createEnquiry);

// Protected routes (require authentication)
router.get('/', protect, getEnquiries);
router.get('/:id', protect, getEnquiry);
router.put('/:id', protect, updateEnquiry);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);

export default router;
