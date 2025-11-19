// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  // Enquiries
  ENQUIRIES: {
    BASE: '/enquiries',
    BY_ID: (id: string) => `/enquiries/${id}`,
    UPDATE_STATUS: (id: string) => `/enquiries/${id}`,
    DELETE: (id: string) => `/enquiries/${id}`,
  },
  // Contact Messages
  CONTACT: {
    BASE: '/contact',
    BY_ID: (id: string) => `/contact/${id}`,
    UPDATE_STATUS: (id: string) => `/contact/${id}`,
    DELETE: (id: string) => `/contact/${id}`,
  },
  // Users (Admin)
  USERS: {
    BASE: '/auth/users',
    BY_ID: (id: string) => `/auth/users/${id}`,
    UPDATE: (id: string) => `/auth/users/${id}`,
    DELETE: (id: string) => `/auth/users/${id}`,
  },
} as const;

// Messages
export const MESSAGES = {
  // Success Messages
  SUCCESS: {
    ENROLLMENT_SUBMITTED: 'Enrollment submitted successfully!',
    CONTACT_SUBMITTED: 'Message sent successfully!',
    STATUS_UPDATED: 'Status updated successfully!',
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logged out successfully!',
    DATA_SAVED: 'Data saved successfully!',
    DATA_DELETED: 'Data deleted successfully!',
  },
  // Error Messages
  ERROR: {
    GENERAL: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    LOGIN_FAILED: 'Invalid credentials. Please try again.',
    ENROLLMENT_FAILED: 'Failed to submit enrollment. Please try again.',
    CONTACT_FAILED: 'Failed to send message. Please try again.',
    FETCH_FAILED: 'Failed to fetch data. Please try again.',
    UPDATE_FAILED: 'Failed to update. Please try again.',
    DELETE_FAILED: 'Failed to delete. Please try again.',
    VALIDATION_FAILED: 'Please check your input and try again.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
  },
  // Info Messages
  INFO: {
    LOADING: 'Loading...',
    NO_DATA: 'No data found',
    PLEASE_LOGIN: 'Please login first',
    CONTACT_WITHIN_24H: "We'll contact you within 24 hours",
    SECURE_CONFIDENTIAL: 'Secure & confidential',
    NO_RECENT_ACTIVITY: 'No recent activity',
    NO_ENQUIRIES: 'No enquiries found',
    NO_MESSAGES: 'No messages found',
  },
  // Validation Messages
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    MIN_LENGTH: (length: number) => `Minimum ${length} characters required`,
    MAX_LENGTH: (length: number) => `Maximum ${length} characters allowed`,
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'beautyAcademyToken',
  USER_DATA: 'beautyAcademyUser',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Status Options
export const STATUS = {
  ENQUIRY: {
    NEW: 'new',
    CONTACTED: 'contacted',
    ENROLLED: 'enrolled',
    REJECTED: 'rejected',
  },
  CONTACT: {
    NEW: 'new',
    READ: 'read',
    REPLIED: 'replied',
    ARCHIVED: 'archived',
  },
  USER: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'en-GB', // 18 Nov 2025
  SHORT: { day: '2-digit', month: 'short', year: 'numeric' } as const,
  LONG: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const,
} as const;
