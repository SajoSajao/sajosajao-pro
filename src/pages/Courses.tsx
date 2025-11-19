import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COURSES } from '../constants/courses';
import { getCourseDetailRoute } from '../constants/routes';
import { PAGE_TITLES, SEO_META } from '../constants/seo';

interface OutletContext {
  handleEnrollClick: (courseName?: string, courseFee?: string) => void;
}

export const Courses: React.FC = () => {
  const { handleEnrollClick } = useOutletContext<OutletContext>();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What qualifications do I need to enroll?',
      answer: 'No prior experience is required for most of our courses. We welcome beginners and provide comprehensive training from the basics to advanced techniques.'
    },
    {
      question: 'Are payment plans available?',
      answer: 'Yes, we offer flexible payment plans to make our courses accessible. Contact us to discuss payment options that work for your budget.'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'Absolutely! We have partnerships with local salons and beauty businesses, and provide career guidance, portfolio development, and job placement assistance to all graduates.'
    },
    {
      question: 'What is included in the course fees?',
      answer: 'Course fees include all training materials, professional tools and products, hands-on practice sessions, certification upon completion, and ongoing support during your course.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <Helmet>
        <title>{PAGE_TITLES.COURSES}</title>
        <meta name="description" content={SEO_META.DESCRIPTION.COURSES} />
        <meta name="keywords" content="beautician courses, basic beautician course, advanced beautician course, beauty training, salon course, makeup course" />
        
        <meta property="og:title" content="Beautician Courses - Basic & Advanced Training | SajoSajo" />
        <meta property="og:description" content={SEO_META.DESCRIPTION.COURSES} />
        <meta property="og:url" content="https://sajosajo.com/courses" />
        
        <link rel="canonical" href="https://sajosajo.com/courses" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blush to-cream overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-gray-800 mb-6">
              Our <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of professional beauty training programs designed to transform your passion into expertise
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-soft-pink/20 rounded-full blur-xl"></div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Course Introduction */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully designed beautician courses that cover everything from basics to advanced techniques
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="course-card bg-white rounded-2xl shadow-lg overflow-hidden relative cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                onClick={() => window.location.href = getCourseDetailRoute(course.id)}
              >
                {/* Popular Badge for Advanced Course */}
                {course.badge && (
                  <div className="absolute top-0 right-0 bg-gold text-white px-4 py-1 rounded-bl-xl font-bold z-10">
                    <i className="fas fa-crown mr-1"></i> {course.badge}
                  </div>
                )}
                
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${
                      course.id === 'basic-beautician'
                        ? 'bg-gradient-to-r from-rose to-soft-pink'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    } text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      {course.subtitle}
                    </span>
                  </div>
                  <div className={`absolute ${course.badge ? 'top-12' : 'top-4'} right-4`}>
                    <span className="bg-white/95 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {course.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-calendar-alt text-rose"></i>
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-semibold text-gray-800">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-clock text-rose"></i>
                      <div>
                        <div className="text-xs text-gray-500">{course.id === 'basic-beautician' ? 'Schedule' : 'Timing'}</div>
                        <div className="font-semibold text-gray-800">{course.schedule}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Course Highlights</h4>
                    <div className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <i className="fas fa-check-circle text-green-500 mt-1 text-sm"></i>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-blush to-cream p-4 rounded-xl">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Course Fee</div>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-gray-400 line-through">
                          ₹{course.originalFee}
                        </div>
                        <div className="text-3xl font-bold text-rose">₹{course.fee}</div>
                      </div>
                      <div className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-1">
                        {course.discount}
                      </div>
                    </div>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={getCourseDetailRoute(course.id)}
                      className="bg-white border-2 border-rose text-rose py-3 rounded-full font-semibold text-center hover:bg-rose hover:text-white transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnrollClick(course.title, course.fee);
                      }}
                      className="bg-gradient-to-r from-rose to-soft-pink text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blush to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our courses and enrollment process
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors duration-300"
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose to-soft-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
            Not Sure Which Course to Choose?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Contact our admission counselors for personalized course recommendations based on your goals and interests
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-rose px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <i className="fas fa-phone mr-2"></i>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};
