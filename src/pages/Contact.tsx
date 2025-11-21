import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { sanitizeUserInput } from '../utils/sanitize';
import { apiService } from '../services/api';
import { PAGE_TITLES, SEO_META } from '../constants/seo';

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .transform(val => val.trim()),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .transform(val => val.trim()),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .transform(val => val.toLowerCase().trim())
    .optional()
    .or(z.literal('')),
  
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .refine((val) => {
      // Check if phone number is not all same digits
      const allSame = /^(.)\1{9}$/.test(val);
      return !allSame;
    }, 'Please enter a valid phone number')
    .refine((val) => {
      // Check if phone starts with valid Indian mobile prefix (6-9)
      return /^[6-9]/.test(val);
    }, 'Phone number must start with 6, 7, 8, or 9'),
  
  course: z
    .string()
    .max(100, 'Course selection too long')
    .optional(),
  
  message: z
    .string()
    .min(3, 'Message must be at least 3 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .transform(val => val.trim()),
  
  newsletter: z.boolean().optional(),
  
  // Honeypot field for bot protection
  website: z.string().max(0, 'Bot detected').optional()
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    // Rate limiting: Prevent spam submissions
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    if (timeSinceLastSubmit < 10000) {
      alert('Please wait 10 seconds before submitting again.');
      return;
    }
    
    // Limit submission attempts
    if (submissionAttempts >= 3) {
      alert('Too many submission attempts. Please refresh the page and try again.');
      return;
    }
    
    // Honeypot check for bots
    if (data.website) {
      if (import.meta.env.DEV) {
        console.log('Bot detected');
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionAttempts(prev => prev + 1);
    setLastSubmitTime(now);

    try {
      // Enhanced sanitization with additional security
      const sanitizedData = {
        firstName: sanitizeUserInput(data.firstName.trim()),
        lastName: sanitizeUserInput(data.lastName.trim()),
        email: data.email ? sanitizeUserInput(data.email.toLowerCase().trim()) : '',
        phone: data.phone.replace(/\D/g, ''), // Remove all non-digits
        course: data.course ? sanitizeUserInput(data.course) : '',
        message: sanitizeUserInput(data.message.trim()),
        newsletter: data.newsletter || false
      };
      
      // Additional validation: Ensure phone is exactly 10 digits
      if (sanitizedData.phone.length !== 10) {
        throw new Error('Invalid phone number format');
      }

      // Send data to backend API
      const response = await apiService.submitContactMessage(sanitizedData);
      
      if (import.meta.env.DEV) {
        console.log('Contact Form Success:', response);
      }

      setSubmitSuccess(true);
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'How do I apply for a course?',
      answer: "You can apply by filling out our contact form, calling us directly, or visiting our campus. We'll schedule a consultation to discuss your goals and help you choose the right program."
    },
    {
      question: 'What should I bring to the first class?',
      answer: 'Just bring yourself and enthusiasm to learn! We provide all professional tools, products, and materials needed for your course. A notebook for taking notes is recommended.'
    },
    {
      question: 'Do you offer online classes?',
      answer: 'While some theory components are available online, our hands-on beauty training requires in-person attendance to ensure you get the practical experience needed for professional success.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <Helmet>
        <title>{PAGE_TITLES.CONTACT}</title>
        <meta name="description" content={SEO_META.DESCRIPTION.CONTACT} />
        <meta name="keywords" content="contact beautician academy, beautician course enquiry, beauty training contact, salon course admission, Kolkata beauty academy" />
        
        <meta property="og:title" content="Contact Us - Beautician Course Enquiry | SajoSajo" />
        <meta property="og:description" content={SEO_META.DESCRIPTION.CONTACT} />
        <meta property="og:url" content="https://sajosajo.com/contact" />
        
        <link rel="canonical" href="https://sajosajo.com/contact" />
        
        {/* Local Business Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "SajoSajo Beauty Academy",
            "description": "Professional beautician training institute in Kolkata",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ghola",
              "addressLocality": "Sodepur",
              "addressRegion": "West Bengal",
              "postalCode": "700110",
              "addressCountry": "India"
            },
            "telephone": "+91-99338-20006",
            "email": "hello@sajosajo.com",
            "url": "https://sajosajo.com",
            "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00"
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blush to-cream overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-gray-800 mb-6">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your beauty career journey? Get in touch with us for enrollment information, course details, or any questions you may have.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-soft-pink/20 rounded-full blur-xl"></div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="contact-card bg-gradient-to-br from-blush to-light-gold p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fas fa-phone text-rose text-2xl"></i>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with our admissions team</p>
              <a href="tel:+919933820006" className="text-rose font-semibold text-lg hover:underline transition-all duration-300">
                +91 99338 20006
              </a>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</p>
            </div>
            
            {/* Email */}
            <div className="contact-card bg-gradient-to-br from-cream to-light-gold p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fas fa-envelope text-rose text-2xl"></i>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us your questions</p>
              <a href="mailto:hello@sajosajo.com" className="text-rose font-semibold text-lg hover:underline transition-all duration-300">
                hello@sajosajo.com
              </a>
              <p className="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
            </div>
            
            {/* Location */}
            <div className="contact-card bg-gradient-to-br from-light-gold to-blush p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fas fa-map-marker-alt text-rose text-2xl"></i>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Visit Us</h3>
              <p className="text-gray-600 mb-4">Come see our facilities</p>
              <address className="text-rose font-semibold text-lg not-italic">
                Sodepur Ghola, Kolkata<br />
                West Bengal 700110
              </address>
              <p className="text-sm text-gray-500 mt-2">Free parking available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gradient-to-br from-blush to-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="contact-form" className="animate-slide-up">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-6">
                  Send Us a <span className="gradient-text">Message</span>
                </h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center animate-fade-in">
                    <i className="fas fa-check-circle text-green-600 text-2xl mr-3"></i>
                    <div>
                      <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                        First Name <span className="text-rose">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose focus:border-rose outline-none"
                        placeholder="Enter your first name"
                        disabled={isSubmitting}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                        Last Name <span className="text-rose">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose focus:border-rose outline-none"
                        placeholder="Enter your last name"
                        disabled={isSubmitting}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address <span className="text-gray-500 text-sm">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose focus:border-rose outline-none"
                      placeholder="your.email@example.com (optional)"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number <span className="text-rose">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose focus:border-rose outline-none"
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
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="course" className="block text-gray-700 font-medium mb-2">
                      Course of Interest
                    </label>
                    <select
                      id="course"
                      {...register('course')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose focus:border-rose outline-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a course</option>
                      <option value="basic-beautician">Basic Beautician Course</option>
                      <option value="advanced-beautician">Advanced Beautician Course</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message <span className="text-rose">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose focus:border-rose outline-none resize-none"
                      placeholder="Tell us about your goals, experience level, or any questions you have... (minimum 3 characters)"
                      disabled={isSubmitting}
                      maxLength={1000}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Minimum 3 characters required</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      {...register('newsletter')}
                      className="mt-1 h-4 w-4 text-rose border-gray-300 rounded focus:ring-rose"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      I would like to receive updates about new courses and special offers
                    </label>
                  </div>
                  
                  {/* Honeypot field - hidden from users, visible to bots */}
                  <div style={{ display: 'none' }}>
                    <label htmlFor="website">Website (leave blank):</label>
                    <input
                      type="text"
                      id="website"
                      {...register('website')}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose to-soft-pink text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Map & Additional Info */}
            <div className="animate-slide-up space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="h-64 bg-gray-200 relative">
                  {/* Embedded Google Map */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8934273849!2d88.34871531495604!3d22.738329984947836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c7c84e8b7b9%3A0x1234567890abcdef!2sGhola%2C%20Sodepur%2C%20West%20Bengal%20700110!5e0!3m2!1sen!2sin!4v1637068293123!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SajoSajo Beauty Academy - Sodepur Ghola, Kolkata"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-gray-800 mb-4">Find Us Here</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-map-marker-alt text-rose"></i>
                      <span className="text-gray-600">Sodepur Ghola, Kolkata, West Bengal 700110</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-car text-rose"></i>
                      <span className="text-gray-600">Free parking available</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-bus text-rose"></i>
                      <span className="text-gray-600">Near Ghola Bus Stop (3 min walk)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Contact Info */}
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <h3 className="text-xl font-playfair font-bold text-gray-800 mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                      <i className="fab fa-whatsapp text-green-500 text-xl"></i>
                      <span className="text-gray-700">WhatsApp</span>
                    </div>
                    <a href="https://wa.me/919933820006" className="text-rose font-semibold hover:underline">
                      Chat Now
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                      <i className="fab fa-instagram text-pink-500 text-xl"></i>
                      <span className="text-gray-700">Instagram</span>
                    </div>
                    <a href="#" className="text-rose font-semibold hover:underline">
                      Follow Us
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                      <i className="fab fa-facebook text-blue-500 text-xl"></i>
                      <span className="text-gray-700">Facebook</span>
                    </div>
                    <a href="#" className="text-rose font-semibold hover:underline">
                      Like Page
                    </a>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blush to-light-gold rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Schedule a Campus Tour</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Visit our state-of-the-art training facilities and meet our expert instructors.
                  </p>
                  <button className="w-full bg-white text-rose py-2 rounded-lg font-semibold hover:shadow-md transition-all duration-300">
                    Book Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              Still Have <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about enrollment and our programs
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${
                  index === 0 ? 'from-blush to-light-gold' :
                  index === 1 ? 'from-cream to-light-gold' :
                  'from-light-gold to-blush'
                } rounded-xl shadow-lg overflow-hidden`}
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full text-left p-6 focus:outline-none hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    <i
                      className={`fas fa-chevron-down text-rose transition-transform duration-300 ${
                        activeFAQ === index ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </div>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
