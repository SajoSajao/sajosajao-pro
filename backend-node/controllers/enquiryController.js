import CourseEnquiry from '../models/CourseEnquiry.js';

// @desc    Create new course enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, course, courseFee, message } = req.body;

    // Validate required fields
    if (!name || !phone || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, phone, course)'
      });
    }

    const enquiry = await CourseEnquiry.create({
      name,
      phone,
      course,
      courseFee,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Enrollment enquiry submitted successfully!',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin/Staff)
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = status ? { status } : {};
    
    const enquiries = await CourseEnquiry.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await CourseEnquiry.countDocuments(query);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: enquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin/Staff)
export const getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await CourseEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (Admin/Staff)
export const updateEnquiry = async (req, res, next) => {
  try {
    const { status } = req.body;

    const enquiry = await CourseEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await CourseEnquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
