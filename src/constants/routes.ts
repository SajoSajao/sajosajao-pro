// Application route constants

export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    ENQUIRIES: '/admin/dashboard/enquiries',
    MESSAGES: '/admin/dashboard/messages',
    USERS: '/admin/dashboard/users',
  },
} as const;

export const getCourseDetailRoute = (courseId: string): string => {
  return `/courses/${courseId}`;
};
