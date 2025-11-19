import { z } from 'zod';

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long')
    .regex(/^[\d+\-\s()]+$/, 'Please enter a valid phone number'),
  
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

// Enrollment Form Validation Schema (Enhanced Security)
export const enrollmentFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .transform(val => val.trim()),
  
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .refine((val) => {
      // Additional security: Check if phone number is not all same digits
      const allSame = /^(.)\1{9}$/.test(val);
      return !allSame;
    }, 'Please enter a valid phone number')
    .refine((val) => {
      // Check if phone starts with valid Indian mobile prefix (6-9)
      return /^[6-9]/.test(val);
    }, 'Phone number must start with 6, 7, 8, or 9'),
  
  course: z
    .string()
    .min(1, 'Please select a course')
    .max(200, 'Course name too long'),
  
  courseFee: z
    .string()
    .min(1, 'Course fee is required')
    .max(50, 'Invalid course fee'),
  
  message: z
    .string()
    .max(500, 'Message must be less than 500 characters')
    .transform(val => val ? val.trim() : '')
    .optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>;
