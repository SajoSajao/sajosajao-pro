import type { Course, Testimonial, Stat } from '../types';

export const COURSES: Course[] = [
  {
    id: 'basic-beautician',
    title: 'Basic Beautician Course',
    subtitle: 'Perfect for Beginners',
    description: 'Start your beauty career with essential skills in skincare, makeup, and basic beauty treatments.',
    duration: '20 Days',
    level: 'Beginner',
    fee: '10,000',
    originalFee: '20,000',
    discount: '50% OFF',
    schedule: 'Sat-Sun Off',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
    category: 'all',
    features: [
      'Skin analysis & Facial treatments',
      'Manicure, Pedicure & Waxing',
      'Threading & Mehendi application',
      '12 essential beauty techniques'
    ],
    modules: [
      {
        title: 'Skin Analysis',
        description: 'Learn to identify different skin types and their specific care requirements.',
        icon: 'fa-search'
      },
      {
        title: 'Facial Treatments',
        description: 'Master professional facial techniques for glowing, healthy skin.',
        icon: 'fa-spa'
      },
      {
        title: 'Bleach & D-Tan',
        description: 'Professional skin lightening and tan removal techniques.',
        icon: 'fa-sparkles'
      },
      {
        title: 'Cleanups',
        description: 'Deep cleansing procedures for clear and radiant skin.',
        icon: 'fa-broom'
      },
      {
        title: 'Manicure',
        description: 'Professional hand and nail care treatments.',
        icon: 'fa-hand-sparkles'
      },
      {
        title: 'Pedicure',
        description: 'Complete foot and toenail care procedures.',
        icon: 'fa-shoe-prints'
      },
      {
        title: 'Waxing',
        description: 'Safe and effective hair removal techniques.',
        icon: 'fa-leaf'
      },
      {
        title: 'Hair Colour Root Touch Up',
        description: 'Basic hair coloring and root touch-up application.',
        icon: 'fa-palette'
      },
      {
        title: 'Threading',
        description: 'Traditional hair removal technique for eyebrows and facial hair.',
        icon: 'fa-cut'
      },
      {
        title: 'Head Oil Massage',
        description: 'Relaxing scalp and hair massage techniques.',
        icon: 'fa-head-side-massage'
      },
      {
        title: 'Mehendi Application',
        description: 'Traditional henna art and design application.',
        icon: 'fa-hand-holding-heart'
      },
      {
        title: 'Product Knowledge',
        description: 'Understanding beauty products, ingredients, and their applications.',
        icon: 'fa-book-open'
      }
    ],
    benefits: [
      {
        title: 'Professional Certification',
        description: 'Receive an industry-recognized certificate upon successful completion.',
        icon: 'fa-certificate'
      },
      {
        title: 'Career Opportunities',
        description: 'Start your career in salons or launch your own beauty business.',
        icon: 'fa-briefcase'
      },
      {
        title: 'Practical Training',
        description: 'Hands-on practice with real clients under expert supervision.',
        icon: 'fa-users'
      },
      {
        title: 'Expert Instructors',
        description: 'Learn from experienced beauty professionals with years of industry expertise.',
        icon: 'fa-chalkboard-teacher'
      }
    ]
  },
  {
    id: 'advanced-beautician',
    title: 'Advanced Beautician Course',
    subtitle: 'Professional Level',
    description: 'Elevate your skills with our comprehensive 30-day professional program covering 24+ advanced beauty techniques and business skills.',
    duration: '30 Days',
    level: 'Professional',
    fee: '15,000',
    originalFee: '30,000',
    discount: '50% OFF',
    schedule: '11 AM - 4 PM',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
    category: 'all',
    features: [
      'Advanced Facial (Korean O3 + Aroma)',
      'Body Massage & Polishing',
      'Hair Spa, Cut & Colour techniques',
      '24 comprehensive beauty techniques'
    ],
    modules: [
      {
        title: 'Type of Skin',
        description: 'In-depth study of different skin types and characteristics.',
        icon: 'fa-microscope',
        color: 'purple'
      },
      {
        title: 'Layers of Skin',
        description: 'Understanding skin anatomy and structure.',
        icon: 'fa-layer-group',
        color: 'purple'
      },
      {
        title: 'Customer Counselling',
        description: 'Professional client consultation and communication.',
        icon: 'fa-comments',
        color: 'rose'
      },
      {
        title: 'Self Grooming',
        description: 'Professional appearance and personal presentation.',
        icon: 'fa-user-tie',
        color: 'rose'
      },
      {
        title: 'Waxing (Water & Oil Soluble)',
        description: 'Advanced waxing techniques with different products.',
        icon: 'fa-leaf',
        color: 'rose'
      },
      {
        title: 'Threading',
        description: 'Expert threading for perfect eyebrow shaping.',
        icon: 'fa-cut',
        color: 'rose'
      },
      {
        title: 'Pedicure (Normal to Advanced)',
        description: 'From basic to luxury spa pedicure treatments.',
        icon: 'fa-shoe-prints',
        color: 'rose'
      },
      {
        title: 'Body Polishing',
        description: 'Full body exfoliation and brightening treatments.',
        icon: 'fa-gem',
        color: 'rose'
      },
      {
        title: 'Manicure',
        description: 'Professional hand and nail care services.',
        icon: 'fa-hand-sparkles',
        color: 'rose'
      },
      {
        title: 'Body Massage',
        description: 'Therapeutic body massage techniques.',
        icon: 'fa-spa',
        color: 'rose'
      },
      {
        title: 'Bleach',
        description: 'Safe skin lightening and brightening procedures.',
        icon: 'fa-sparkles',
        color: 'rose'
      },
      {
        title: 'Cleanups',
        description: 'Deep pore cleansing and purification.',
        icon: 'fa-broom',
        color: 'rose'
      },
      {
        title: 'Facial (Normal to Advanced)',
        description: 'Complete facial therapy from basic to professional.',
        icon: 'fa-crown',
        color: 'pink'
      },
      {
        title: 'Korean O3 + Aroma Facial',
        description: 'Latest Korean facial techniques with aromatherapy.',
        icon: 'fa-star',
        color: 'pink'
      },
      {
        title: 'Knowledge of Facial Tools',
        description: 'Professional equipment and their applications.',
        icon: 'fa-tools',
        color: 'pink'
      },
      {
        title: 'D-Tan',
        description: 'Advanced tan removal and skin brightening.',
        icon: 'fa-sun',
        color: 'rose'
      },
      {
        title: 'Hair Colour',
        description: 'Professional hair coloring techniques and theory.',
        icon: 'fa-palette',
        color: 'indigo'
      },
      {
        title: 'Head Oil Massage',
        description: 'Therapeutic scalp massage for hair health.',
        icon: 'fa-head-side-massage',
        color: 'indigo'
      },
      {
        title: 'Hair Spa',
        description: 'Complete hair spa treatments for nourishment and repair.',
        icon: 'fa-spa',
        color: 'indigo'
      },
      {
        title: 'Hair Cut',
        description: 'Professional hair cutting techniques for different styles.',
        icon: 'fa-cut',
        color: 'indigo'
      },
      {
        title: 'Mehendi Application',
        description: 'Expert henna design and application techniques.',
        icon: 'fa-hand-holding-heart',
        color: 'green'
      },
      {
        title: 'Product Knowledge',
        description: 'Comprehensive understanding of beauty products and ingredients.',
        icon: 'fa-flask',
        color: 'amber'
      },
      {
        title: 'Professional Communication',
        description: 'Client interaction and professional etiquette.',
        icon: 'fa-handshake',
        color: 'blue'
      },
      {
        title: 'Business Skills',
        description: 'Salon management and entrepreneurship basics.',
        icon: 'fa-chart-line',
        color: 'teal'
      }
    ],
    benefits: [
      {
        title: 'Professional Certification',
        description: 'Industry-recognized advanced beautician certificate.',
        icon: 'fa-award'
      },
      {
        title: 'Business Training',
        description: 'Learn to start and manage your own beauty salon.',
        icon: 'fa-store'
      },
      {
        title: 'Advanced Techniques',
        description: 'Master the latest beauty trends and technologies.',
        icon: 'fa-magic'
      },
      {
        title: 'Career Support',
        description: 'Placement assistance and career guidance.',
        icon: 'fa-user-graduate'
      },
      {
        title: 'Expert Mentorship',
        description: 'Personal guidance from industry professionals.',
        icon: 'fa-user-tie'
      },
      {
        title: 'Lifetime Access',
        description: 'Free refresher sessions and ongoing support.',
        icon: 'fa-infinity'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Makeup Artist',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
    content: 'The comprehensive makeup course transformed my hobby into a thriving business. The instructors were amazing and the hands-on training was invaluable.',
    rating: 5
  },
  {
    id: '2',
    name: 'Emily Chen',
    role: 'Hair Stylist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'I learned cutting-edge hair styling techniques that helped me land my dream job at a high-end salon. The support from instructors was exceptional.',
    rating: 5
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Skincare Specialist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
    content: 'The skincare program gave me the knowledge and confidence to open my own spa. The business training was just as valuable as the technical skills.',
    rating: 5
  }
];

export const STATS: Stat[] = [
  { value: '100+', label: 'Graduates' },
  { value: '15+', label: 'Courses' },
  { value: '98%', label: 'Success Rate' },
  { value: '5+', label: 'Years Experience' }
];
