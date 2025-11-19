import React from 'react';
import { Helmet } from 'react-helmet-async';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <Helmet>
        <title>Terms of Service - SajoSajo Beauty Academy</title>
        <meta name="description" content="Terms of Service for SajoSajo Beauty Academy. Read our terms and conditions for course enrollment and website usage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blush to-cream overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read our terms and conditions carefully before enrolling in our courses
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-700">
                <strong>Last Updated:</strong> November 19, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-8">
                Welcome to <strong>SajoSajo Beauty Academy</strong> ("we", "our", "us"). By accessing or enrolling in our beautician courses through this website, you agree to the following Terms of Service. Please read them carefully.
              </p>

              <div className="space-y-8">
                
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    By using this website or enrolling in any course, you confirm that you have read, understood, and agreed to these Terms of Service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Eligibility
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">You must be:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>At least 16 years old, or</li>
                    <li>Have parental/guardian consent for enrollment.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    Course Enrollment & Payments
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Enrollment is confirmed only after full or partial payment (as per plan).</li>
                    <li>Course fees are non-refundable, except in special cases at management discretion.</li>
                    <li>We reserve the right to modify course fees at any time.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Course Content & Certification
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Students must attend the required number of classes to receive certification.</li>
                    <li>We reserve the right to update or modify course content without prior notice.</li>
                    <li>Certification is awarded only upon successful completion of practical & theory requirements.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    Class Attendance & Discipline
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Students must maintain discipline and respect faculty and other learners.</li>
                    <li>Misconduct may result in termination from the course without refund.</li>
                    <li>Repeated absence may affect certification eligibility.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                    Use of Website
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">You agree not to:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Misuse the website</li>
                    <li>Attempt to hack, copy, or resell course content</li>
                    <li>Post harmful, false, or abusive content</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Website content is for personal learning only and is protected by copyright.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                    Intellectual Property
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All photos, videos, text, graphics, and course materials belong to SajoSajo Beauty Academy.</li>
                    <li>Unauthorized copying or sharing is strictly prohibited.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                    Limitation of Liability
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">We are not responsible for:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Technical issues or website downtime</li>
                    <li>Any loss or damage from using our services</li>
                    <li>The results of skills learned (self-practice is required)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
                    Changes to Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update these Terms occasionally. Continued use of the website indicates acceptance of updated terms.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blush to-light-gold rounded-xl p-6">
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">10</span>
                    Contact Us
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For any queries, reach out to us at:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-envelope text-rose"></i>
                      <a href="mailto:hello@sajosajo.com" className="text-rose font-semibold hover:underline">
                        hello@sajosajo.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-phone text-rose"></i>
                      <a href="tel:+919933820006" className="text-rose font-semibold hover:underline">
                        +91 99338 20006
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-map-marker-alt text-rose"></i>
                      <span>Sodepur Ghola, Kolkata, West Bengal 700110</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};