import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '../components/ui';
import { TESTIMONIALS, STATS } from '../constants/courses';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PAGE_TITLES, SEO_META, OG_TAGS, STRUCTURED_DATA } from '../constants/seo';

interface OutletContext {
  handleEnrollClick: (courseName?: string, courseFee?: string) => void;
}

export const Home: React.FC = () => {
  const { handleEnrollClick } = useOutletContext<OutletContext>();
  const [highlightsRef, highlightsVisible] = useIntersectionObserver();
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();

  // Animated counters
  const [counters, setCounters] = useState(STATS.map(() => 0));

  useEffect(() => {
    if (aboutVisible) {
      STATS.forEach((stat, index) => {
        const target = parseInt(stat.value);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = target;
              return newCounters;
            });
            clearInterval(timer);
          } else {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.floor(current);
              return newCounters;
            });
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [aboutVisible]);

  return (
    <div className="pt-16">
      <Helmet>
        <title>{PAGE_TITLES.HOME}</title>
        <meta name="description" content={SEO_META.DESCRIPTION.HOME} />
        <meta name="keywords" content="beautician course, beautician course in Kolkata, beauty parlour course, makeup course, hair styling course, skin care training, professional beautician training, beauty academy" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={OG_TAGS.TITLE} />
        <meta property="og:description" content={OG_TAGS.DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sajosajo.com" />
        <meta property="og:image" content="https://sajosajo.com/og-image-beautician-course.jpg" />
        <meta property="og:site_name" content={SEO_META.SITE_NAME} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OG_TAGS.TITLE} />
        <meta name="twitter:description" content={OG_TAGS.DESCRIPTION} />
        <meta name="twitter:image" content="https://sajosajo.com/og-image-beautician-course.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://sajosajo.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(STRUCTURED_DATA.ORGANIZATION)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(STRUCTURED_DATA.COURSES)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": PAGE_TITLES.HOME,
            "description": SEO_META.DESCRIPTION.HOME,
            "url": "https://sajosajo.com",
            "mainEntity": {
              "@type": "EducationalOrganization",
              "name": SEO_META.SITE_NAME,
              "description": SEO_META.LONG_DESCRIPTION
            }
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Beauty salon interior"
            className="w-full h-full object-cover hero-video"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 animate-slide-up">
            Learn the Art of
            <span className="gradient-text block text-white">Beauty & Wellness</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Transform your passion into a profession with our comprehensive beauty training programs.
            Master the latest techniques and build a successful career in the beauty industry.
          </p>
          <div className="space-x-4 animate-slide-up">
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-rose to-soft-pink text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-float">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section ref={highlightsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              Why Choose <span className="gradient-text">SajoSajao</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the premier destination for beauty education
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 ${highlightsVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Professional Courses */}
            <Card className="bg-gradient-to-br from-blush to-light-gold p-8" hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-graduation-cap text-rose text-2xl"></i>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                  Professional Courses
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Comprehensive training programs in makeup artistry, hair styling, skincare, and nail art designed by industry experts.
                </p>
                <Link
                  to="/courses"
                  className="inline-block text-rose font-semibold hover:underline transition-all duration-300"
                >
                  View All Courses <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </Card>

            {/* Expert Trainers */}
            <Card className="bg-gradient-to-br from-cream to-light-gold p-8" hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-users text-rose text-2xl"></i>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                  Expert Trainers
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Learn from certified professionals with years of industry experience and a passion for teaching the art of beauty.
                </p>
                <a
                  href="#testimonials"
                  className="inline-block text-rose font-semibold hover:underline transition-all duration-300"
                >
                  Meet Our Team <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </Card>

            {/* Success Stories */}
            <Card className="bg-gradient-to-br from-light-gold to-blush p-8" hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-star text-rose text-2xl"></i>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                  Success Stories
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Join thousands of successful graduates who have built thriving careers in the beauty industry with our training.
                </p>
                <a
                  href="#testimonials"
                  className="inline-block text-rose font-semibold hover:underline transition-all duration-300"
                >
                  Read Stories <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-gradient-to-br from-blush to-cream">
        <div className="container mx-auto px-4">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${aboutVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
                alt="Students learning makeup techniques"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
                About <span className="gradient-text">Our Academy</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With over 5 years of experience in beauty education, we've established ourselves as a leading training institute.
                Our mission is to empower individuals with the skills and knowledge needed to excel in the beauty and wellness industry.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {STATS.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-rose mb-2">
                      {counters[index]}{stat.value.includes('+') ? '+' : ''}
                      {stat.value.includes('%') ? '%' : ''}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-rose to-soft-pink text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              Student <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our graduates who have transformed their passion into successful careers
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 ${testimonialsVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            {TESTIMONIALS.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`bg-gradient-to-br ${
                  index === 0 ? 'from-blush to-light-gold' :
                  index === 1 ? 'from-cream to-light-gold' :
                  'from-light-gold to-blush'
                } p-8`}
                hover
              >
                <div className="text-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex justify-center">
                  <div className="flex text-gold">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose to-soft-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Ready to Start Your Beauty Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates and transform your passion into a rewarding profession
          </p>
          <div className="space-x-4">
            <Link
              to="/courses"
              className="inline-block bg-white text-rose px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View Courses
            </Link>
            <button
              onClick={() => handleEnrollClick()}
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-rose transition-all duration-300"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
