import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <Helmet>
        <title>Privacy Policy - SajoSajo Beauty Academy</title>
        <meta name="description" content="Privacy Policy for SajoSajo Beauty Academy. Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blush to-cream overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            
            <div className="mb-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-green-700">
                <strong>Last Updated:</strong> November 19, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-8">
                Your privacy is important to us. This Privacy Policy explains how <strong>SajoSajo Beauty Academy</strong> collects, uses, and protects your personal information.
              </p>

              <div className="space-y-8">
                
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Information We Collect
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">We may collect:</p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">a) Personal Information</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Name</li>
                      <li>Phone number</li>
                      <li>Email address</li>
                      <li>Address</li>
                      <li>Age</li>
                      <li>Payment details (processed securely by payment partners)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">b) Website Usage Data</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>IP address</li>
                      <li>Device information</li>
                      <li>Pages visited</li>
                      <li>Time spent</li>
                      <li>Cookies and tracking data</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">We use your data to:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Process course enrollments</li>
                    <li>Send course updates and reminders</li>
                    <li>Provide certificates</li>
                    <li>Improve our website and services</li>
                    <li>Send marketing/offer communications (optional)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    Sharing Your Information
                  </h2>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                    <p className="text-red-700 font-semibold">
                      We do NOT sell or rent your personal information.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">We may share limited data with:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Payment gateway providers</li>
                    <li>SMS/email service providers</li>
                    <li>Legal authorities (if required by law)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Data Protection
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>We use industry-standard practices to protect your information from unauthorized access, misuse, or loss.</li>
                    <li>However, no system is 100% secure.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    Cookies
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Our website uses cookies to:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Improve user experience</li>
                    <li>Track website performance</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You can disable cookies in your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                    Marketing Communications
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>You may receive updates or promotional messages related to our courses.</li>
                    <li>You can opt-out anytime.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                    Your Rights
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">You can request:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>To view the data we store</li>
                    <li>To update or correct your information</li>
                    <li>To delete your data (except required for legal purposes)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                    Third-Party Links
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our website may contain links to external websites. We are not responsible for their content or privacy practices.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
                    Policy Updates
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy. Continued use of the website means you accept the updated policy.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blush to-light-gold rounded-xl p-6">
                  <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-rose text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">10</span>
                    Contact Us
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For privacy-related questions, contact:
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