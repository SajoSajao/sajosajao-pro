// Google Analytics utility functions for SajoSajo Beauty Academy
// Tracking ID: G-8SBS1ZWNN2

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-8SBS1ZWNN2', {
      page_title: title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track enrollment form submissions
export const trackEnrollment = (courseName: string, courseType: string) => {
  trackEvent('enrollment_submission', 'Course Enrollment', `${courseType}: ${courseName}`);
};

// Track contact form submissions
export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submission', 'Contact', formType);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'Button', `${buttonName} - ${location}`);
};

// Track course interest
export const trackCourseInterest = (courseName: string, action: string) => {
  trackEvent(action, 'Course Interest', courseName);
};

// Track phone clicks
export const trackPhoneClick = () => {
  trackEvent('click', 'Contact', 'Phone Number');
};

// Track email clicks
export const trackEmailClick = () => {
  trackEvent('click', 'Contact', 'Email Address');
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'Social Media', platform);
};

// Track file downloads
export const trackDownload = (fileName: string) => {
  trackEvent('download', 'File', fileName);
};

// Track video interactions
export const trackVideo = (action: string, videoName: string) => {
  trackEvent(action, 'Video', videoName);
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', 'Engagement', `${percentage}% Scroll`);
};

// Track time on page
export const trackTimeOnPage = (seconds: number, pageName: string) => {
  trackEvent('time_on_page', 'Engagement', pageName, seconds);
};

// Enhanced e-commerce tracking for course enrollment
export const trackPurchase = (transactionId: string, courseName: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'INR',
      items: [{
        item_id: courseName.toLowerCase().replace(/\s+/g, '-'),
        item_name: courseName,
        category: 'Beauty Course',
        quantity: 1,
        price: value
      }]
    });
  }
};

// Track user engagement
export const trackEngagement = (engagementType: string, details?: string) => {
  trackEvent('engagement', 'User Interaction', `${engagementType}${details ? `: ${details}` : ''}`);
};