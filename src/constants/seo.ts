// SEO Keywords and Meta Information

export const SEO_KEYWORDS = {
  // Primary Keywords (High Volume)
  PRIMARY: [
    'beautician course',
    'beautician course near me',
    'beautician training institute',
    'beautician course fees',
    'best beautician course in India',
    'beauty parlour course',
    'beauty parlour classes',
    'beautician course for beginners',
    'beautician course online',
    'professional beautician course',
    'salon training institute',
    'skin care course',
    'makeup course',
    'hair styling course',
    'beauty and wellness course',
  ],

  // Local SEO Keywords
  LOCAL: [
    'beautician course in Kolkata',
    'beautician course in India',
    'salon training in Kolkata',
    'beauty parlour course in Kolkata',
    'beautician course with certificate',
    'affordable beautician course near me',
    'beautician course for housewives',
    'beautician course for beginners in Kolkata',
  ],

  // Course-Specific Keywords
  COURSE_SPECIFIC: [
    'basic beautician course',
    'advanced beautician course',
    'facial training course',
    'manicure pedicure course',
    'waxing training course',
    'hair colour training',
    'threading course',
    'mehendi course',
    'makeup and skin training',
  ],

  // Interest-Based Keywords (Facebook & Instagram Ads)
  INTEREST_BASED: [
    'beauty academy',
    'makeup lovers',
    'salon professionals',
    'beauty parlour',
    'bridal makeup',
    'cosmetology',
    'hair styling',
    'skin care training',
    'salon owner',
    'housewife skill course',
    'women skill development',
  ],

  // Pain Point Keywords (Facebook & Instagram Ads)
  PAIN_POINT: [
    'learn beautician course in low fees',
    'start your own parlour',
    'earn from home',
    'short-term beautician course',
    'job-ready course for women',
  ],
} as const;

// SEO Meta Information
export const SEO_META = {
  SITE_NAME: 'SajoSajo Beauty Academy',
  TAGLINE: 'Best Beautician Course in Kolkata | Professional Beauty Training Institute',
  DESCRIPTION: {
    HOME: 'Join the best Beautician Course in Kolkata. Basic & Advanced training with certification, practical sessions, and affordable fees. Admission open.',
    COURSES: 'Join the best Beautician Course in Kolkata. Basic & Advanced training with certification, practical sessions, and affordable fees. Admission open.',
    BASIC_COURSE: 'Learn facial, waxing, threading, manicure, pedicure & more. 20-day Basic Beautician Course with certification. Affordable fees. Enroll today!',
    ADVANCED_COURSE: '30-day Advanced Beautician Course with facial tools, hair spa, highlights, body polishing & more. 100% practical salon training. Limited seats!',
    CONTACT: 'Contact SajoSajo Beauty Academy in Kolkata for beautician course enquiry. Get details about course fees, duration, and certification. Best beauty training institute near you.',
  },
  LONG_DESCRIPTION: 'Looking for a career in beauty and wellness? Our Beautician Courses are designed for beginners and professionals who want to build a successful career in the beauty industry. We provide complete practical training in facial, waxing, threading, manicure, pedicure, hair care, skin care, body massage, hair spa, hair colouring, and advanced beauty techniques. Get industry-level training from certified trainers with hands-on practice. On completion, you receive a Beautician Certificate that helps you start your own parlour or get a salon job.',
  LOCATION: {
    CITY: 'Kolkata',
    STATE: 'West Bengal',
    COUNTRY: 'India',
  },
} as const;

// Structured Data for SEO
export const STRUCTURED_DATA = {
  ORGANIZATION: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'SajoSajo Beauty Academy',
    description: 'Professional beautician training institute in Kolkata offering certified courses in makeup, hair styling, and beauty treatments',
    url: 'https://sajosajo.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'India',
    },
    sameAs: [
      // Add social media URLs here
    ],
  },
  COURSES: [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Basic Beautician Course',
      description: 'Essential beauty skills in skincare, makeup, and basic treatments. Perfect for beginners.',
      provider: {
        '@type': 'Organization',
        name: 'SajoSajo Beauty Academy',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'India',
        },
      },
      offers: {
        '@type': 'Offer',
        price: '10000',
        priceCurrency: 'INR',
      },
      educationalLevel: 'Beginner',
      timeRequired: 'P20D',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Advanced Beautician Course',
      description: 'Comprehensive professional program covering 24+ advanced beauty techniques and business skills.',
      provider: {
        '@type': 'Organization',
        name: 'SajoSajo Beauty Academy',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'India',
        },
      },
      offers: {
        '@type': 'Offer',
        price: '15000',
        priceCurrency: 'INR',
      },
      educationalLevel: 'Professional',
      timeRequired: 'P30D',
    },
  ],
} as const;

// Page Titles (SEO Optimized)
export const PAGE_TITLES = {
  HOME: 'Best Beautician Course in Kolkata – Professional Beauty Parlour Training with Certificate',
  COURSES: 'Best Beautician Course in Kolkata – Professional Beauty Parlour Training with Certificate',
  BASIC_COURSE: 'Basic Beautician Course in Kolkata – 20 Days | Learn Facial, Makeup, Waxing',
  ADVANCED_COURSE: 'Advanced Beautician Course – 30 Days Professional Salon Training | Join Now',
  CONTACT: 'Contact Us - Beautician Course Enquiry Kolkata | SajoSajo Beauty Academy',
  BRAND: 'Beautician Training Institute in Kolkata – 100% Practical | Affordable Fees',
} as const;

// Google Ads Titles (30 characters max)
export const GOOGLE_ADS_TITLES = [
  'Beautician Course 20–30 Days',
  'Start Career in Beauty',
  'Advance Beautician Training',
  'Low Fees Beautician Course',
  'Salon Training Near You',
  'Beautician Course Kolkata',
  'Join Beautician Classes',
] as const;

// Google Ads Descriptions (90 characters max)
export const GOOGLE_ADS_DESCRIPTIONS = [
  'Learn facial, hair, skin & makeup. Certificate included.',
  '100% practical beautician training. Join today!',
  'Become a professional beautician in 20–30 days.',
] as const;

// Open Graph (OG) Tags for Social Media
export const OG_TAGS = {
  TITLE: 'Professional Beautician Course – Learn Facial, Hair Care & Makeup',
  DESCRIPTION: 'Join industry-level Beautician Training with 100% practical sessions and certification.',
  IMAGE: '/og-image-beautician-course.jpg', // Path to OG image
  IMAGE_ALT: 'Beautician Course – Join Now',
  URL: 'https://sajosajo.com',
  TYPE: 'website',
  SITE_NAME: 'SajoSajo Beauty Academy',
} as const;

// Helper function to get all keywords as a string
export const getAllKeywords = (): string => {
  return [
    ...SEO_KEYWORDS.PRIMARY,
    ...SEO_KEYWORDS.LOCAL,
    ...SEO_KEYWORDS.COURSE_SPECIFIC,
  ].join(', ');
};

// Helper function to get digital marketing keywords
export const getDigitalMarketingKeywords = (): string => {
  return [
    ...SEO_KEYWORDS.INTEREST_BASED,
    ...SEO_KEYWORDS.PAIN_POINT,
  ].join(', ');
};

// Helper function to get all SEO + marketing keywords
export const getAllMarketingKeywords = (): string => {
  return [
    ...SEO_KEYWORDS.PRIMARY,
    ...SEO_KEYWORDS.LOCAL,
    ...SEO_KEYWORDS.COURSE_SPECIFIC,
    ...SEO_KEYWORDS.INTEREST_BASED,
    ...SEO_KEYWORDS.PAIN_POINT,
  ].join(', ');
};
