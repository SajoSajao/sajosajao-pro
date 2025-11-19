import type { NavLink, SocialLink } from '../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Success Stories', href: '#testimonials' },
  { label: 'Contact', href: '/contact' }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Facebook',
    url: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com',
    icon: 'fa-facebook-f'
  },
  {
    platform: 'Instagram',
    url: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com',
    icon: 'fa-instagram'
  },
  {
    platform: 'WhatsApp',
    url: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919933820006'}`,
    icon: 'fa-whatsapp'
  },
  {
    platform: 'YouTube',
    url: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com',
    icon: 'fa-youtube'
  }
];

export const CONTACT_INFO = {
  address: 'Sodepur Ghola, Kolkata, West Bengal 700110',
  phone: '+91 99338 20006',
  email: 'hello@sajosajo.com'
};
