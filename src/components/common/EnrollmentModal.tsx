import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enrollmentFormSchema, type EnrollmentFormData } from '../../utils/validation';
import { sanitizeUserInput } from '../../utils/sanitize';
import { trackEnrollment } from '../../utils/analytics';
import { apiService } from '../../services/api';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName?: string;
  courseFee?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  courseName = 'Course Selection',
  courseFee = 'Contact us'
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      course: courseName,
      courseFee: courseFee
    }
  });

  // Update form values when courseName or courseFee changes
  useEffect(() => {
    setValue('course', courseName);
    setValue('courseFee', courseFee);
  }, [courseName, courseFee, setValue]);

  const onSubmit = async (data: EnrollmentFormData) => {
    // Rate limiting: Prevent spam submissions
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    if (timeSinceLastSubmit < 5000) {
      alert('Please wait a few seconds before submitting again.');
      return;
    }
    
    // Limit submission attempts
    if (submissionAttempts >= 3) {
      alert('Too many submission attempts. Please refresh the page and try again.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionAttempts(prev => prev + 1);
    setLastSubmitTime(now);

    try {
      // Sanitize inputs with additional XSS protection
      const sanitizedData = {
        name: sanitizeUserInput(data.name.trim()),
        phone: data.phone.replace(/\D/g, ''), // Remove all non-digits for security
        course: sanitizeUserInput(data.course),
        courseFee: sanitizeUserInput(data.courseFee),
        message: data.message ? sanitizeUserInput(data.message.trim()) : ''
      };
      
      // Additional validation: Ensure phone is exactly 10 digits after sanitization
      if (sanitizedData.phone.length !== 10) {
        throw new Error('Invalid phone number format');
      }

      // Send data to backend API
      const response = await apiService.submitEnrollment(sanitizedData);
      
      // Track successful enrollment in Google Analytics
      trackEnrollment(sanitizedData.course, 'enrollment');
      
      // Log success in development only
      if (import.meta.env.DEV) {
        console.log('Enrollment Success:', response);
      }

      setSubmitSuccess(true);
      
      // Show success message
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Enrollment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setSubmitSuccess(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Enroll Now"
      subtitle={courseName}
    >
      {submitSuccess ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600">
            We've received your enrollment request. Our team will contact you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden fields for course and courseFee */}
          <input type="hidden" {...register('course')} value={courseName} />
          <input type="hidden" {...register('courseFee')} value={courseFee} />
          
          {/* Selected Course Display */}
          <div className="bg-gradient-to-r from-rose/10 to-soft-pink/10 p-4 rounded-xl border-2 border-rose/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Selected Course</p>
                <p className="text-base font-bold text-gray-800">{courseName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 mb-1">Course Fee</p>
                <p className="text-lg font-bold gradient-text">₹{courseFee}</p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <Input
            label="Full Name"
            icon="fas fa-user"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Enter your full name"
            required
            disabled={isSubmitting}
          />

          {/* Phone Number */}
          <Input
            label="Phone Number"
            icon="fas fa-phone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="10-digit mobile number"
            required
            disabled={isSubmitting}
            maxLength={10}
            pattern="[0-9]{10}"
            inputMode="numeric"
            autoComplete="tel"
            onKeyPress={(e) => {
              // Only allow numbers
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              // Sanitize pasted content
              const paste = e.clipboardData.getData('text');
              const cleaned = paste.replace(/\D/g, '').slice(0, 10);
              if (cleaned !== paste) {
                e.preventDefault();
                (e.target as HTMLInputElement).value = cleaned;
              }
            }}
          />

          {/* Questions/Requirements */}
          <Textarea
            label="Questions or Special Requirements?"
            icon="fas fa-comment-dots"
            {...register('message')}
            error={errors.message?.message}
            placeholder="Tell us anything we should know..."
            rows={3}
            disabled={isSubmitting}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner size="sm" color="white" />
                <span className="ml-2">Submitting...</span>
              </span>
            ) : (
              <>
                <i className="fas fa-paper-plane mr-2"></i>
                Submit Enrollment
              </>
            )}
          </Button>

          {/* Info Text */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 flex items-center justify-center mb-1">
              <i className="fas fa-shield-alt text-green-500 mr-1.5 text-xs"></i>
              Secure & confidential
            </p>
            <p className="text-xs font-semibold text-gray-600">
              <i className="fas fa-clock text-rose mr-1.5"></i>
              We'll contact you within 24 hours
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};
