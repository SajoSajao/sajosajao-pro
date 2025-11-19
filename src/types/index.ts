// Type definitions for the Beauty Academy application

export interface CourseModule {
  title: string;
  description: string;
  icon: string;
  color?: string;
}

export interface CourseBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Basic' | 'Advanced' | 'Professional';
  fee: string;
  originalFee?: string;
  discount?: string;
  schedule?: string;
  badge?: string;
  image: string;
  features: string[];
  modules: CourseModule[];
  benefits?: CourseBenefit[];
  category: CourseCategory;
}

export type CourseCategory = 'makeup' | 'hair' | 'skincare' | 'nails' | 'all';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EnrollmentFormData {
  name: string;
  phone: string;
  course: string;
  courseFee: string;
  message?: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}
