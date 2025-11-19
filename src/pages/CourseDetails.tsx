import React from 'react';
import { useParams, Link, Navigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COURSES } from '../constants/courses';
import { PAGE_TITLES, SEO_META } from '../constants/seo';

interface OutletContext {
  handleEnrollClick: (courseName?: string, courseFee?: string) => void;
}

const getColorClasses = (color?: string) => {
  switch (color) {
    case 'purple':
      return 'bg-purple-500';
    case 'pink':
      return 'bg-pink-500';
    case 'indigo':
      return 'bg-indigo-500';
    case 'green':
      return 'bg-green-500';
    case 'amber':
      return 'bg-amber-500';
    case 'blue':
      return 'bg-blue-500';
    case 'teal':
      return 'bg-teal-500';
    default:
      return 'bg-rose';
  }
};

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { handleEnrollClick } = useOutletContext<OutletContext>();
  const course = COURSES.find(c => c.id === id);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>{course.id === 'basic-beautician' ? PAGE_TITLES.BASIC_COURSE : PAGE_TITLES.ADVANCED_COURSE}</title>
        <meta name="description" content={course.id === 'basic-beautician' ? SEO_META.DESCRIPTION.BASIC_COURSE : SEO_META.DESCRIPTION.ADVANCED_COURSE} />
        <meta name="keywords" content={`${course.title}, ${course.id === 'basic-beautician' ? 'basic beautician course, facial training, waxing training, threading course' : 'advanced beautician course, professional salon training, hair spa, body polishing'}, beautician course in Kolkata`} />
        
        <meta property="og:title" content={course.title + ' - Professional Beautician Training | SajoSajo'} />
        <meta property="og:description" content={course.description} />
        <meta property="og:url" content={`https://sajosajo.com/courses/${course.id}`} />
        
        <link rel="canonical" href={`https://sajosajo.com/courses/${course.id}`} />
        
        {/* Course Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": course.title,
            "description": course.description,
            "provider": {
              "@type": "Organization",
              "name": "SajoSajo Beauty Academy",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kolkata",
                "addressRegion": "West Bengal",
                "addressCountry": "India"
              }
            },
            "offers": {
              "@type": "Offer",
              "price": course.fee,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "educationalLevel": course.id === 'basic-beautician' ? 'Beginner' : 'Professional',
            "timeRequired": course.duration,
            "courseMode": "In-person",
            "teaches": course.features
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-gradient-to-br from-blush to-cream">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link to="/courses" className="text-rose hover:text-dusty-rose transition-colors flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Back to Courses
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {course.id === 'basic-beautician' ? (
                <span className="bg-gradient-to-r from-rose to-soft-pink text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                  {course.subtitle}
                </span>
              ) : (
                <div className="flex gap-3 mb-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {course.subtitle}
                  </span>
                  {course.badge && (
                    <span className="bg-gold text-white px-4 py-2 rounded-full text-sm font-semibold">
                      <i className="fas fa-crown mr-1"></i> {course.badge}
                    </span>
                  )}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full">
                  <i className="fas fa-calendar-alt text-rose"></i>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full">
                  <i className="fas fa-clock text-rose"></i>
                  <span className="font-semibold">{course.schedule}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full">
                  <i className={`fas ${course.id === 'basic-beautician' ? 'fa-certificate' : 'fa-award'} text-rose`}></i>
                  <span className="font-semibold">{course.id === 'basic-beautician' ? 'Certification' : 'Pro Certification'}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Course Fee</div>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-gray-400 line-through">₹{course.originalFee}</div>
                      <div className="text-4xl font-bold text-rose">₹{course.fee}</div>
                    </div>
                    <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                      {course.discount} - Limited Time Offer
                    </div>
                  </div>
                  <div className="flex text-gold text-xl">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleEnrollClick(course.title, course.fee)}
                className="bg-gradient-to-r from-rose to-soft-pink text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-200"
              >
                <i className="fas fa-user-plus mr-2"></i>Enroll Now
              </button>
            </div>
            <div>
              <img
                src={course.image}
                alt={course.title}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-${course.id === 'advanced-beautician' ? '6xl' : '4xl'} mx-auto`}>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4 text-center">
              {course.id === 'basic-beautician' ? 'Complete Course' : 'Comprehensive'}{' '}
              <span className="gradient-text">Curriculum</span>
            </h2>
            <p className="text-gray-600 text-center mb-12 text-lg">
              Master {course.modules.length}{course.id === 'advanced-beautician' ? '+' : ''} {course.id === 'basic-beautician' ? 'essential' : 'advanced'} beauty techniques{course.id === 'advanced-beautician' ? ' and professional skills' : ''} in {course.duration.toLowerCase()}
            </p>
            
            <div className={`grid md:grid-cols-2 ${course.id === 'advanced-beautician' ? 'lg:grid-cols-3' : ''} gap-6`}>
              {course.modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blush to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${getColorClasses(module.color)} text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <i className={`fas ${module.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">{module.title}</h3>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-20 bg-gradient-to-br from-blush to-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-12 text-center">
              What You'll <span className="gradient-text">Achieve</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {course.benefits?.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-start space-x-4">
                    <i className={`fas ${benefit.icon} text-rose text-3xl`}></i>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose to-soft-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Enroll now and take the first step towards becoming a professional beautician
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleEnrollClick(course.title, course.fee)}
              className="bg-white text-rose px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-graduation-cap mr-2"></i>
              Enroll Now
            </button>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-rose transition-all duration-300"
            >
              <i className="fas fa-phone mr-2"></i>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
