import mongoose from 'mongoose';

const courseEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true,
    match: [/^[+]?[\d\s()-]+$/, 'Please provide a valid phone number']
  },
  course: {
    type: String,
    required: [true, 'Please select a course'],
    trim: true
  },
  courseFee: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled', 'rejected'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
courseEnquirySchema.index({ createdAt: -1 });
courseEnquirySchema.index({ status: 1 });

const CourseEnquiry = mongoose.model('CourseEnquiry', courseEnquirySchema, 'course_enquiries');

export default CourseEnquiry;
