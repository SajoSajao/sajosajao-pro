import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navigation';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { smoothScrollTo } from '../../utils/helpers';

interface NavbarProps {
  onEnrollClick?: (course?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnrollClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const location = useLocation();
  const { y: scrollY } = useScrollPosition();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Track active section on homepage based on scroll position
  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        const sections = [
          { id: 'home', element: document.getElementById('home') || document.querySelector('section') },
          { id: 'about', element: document.getElementById('about') },
          { id: 'testimonials', element: document.getElementById('testimonials') }
        ];

        const scrollPosition = window.scrollY + 100; // Offset for fixed navbar
        
        let currentSection = '/';
        
        for (const section of sections) {
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementBottom = elementTop + rect.height;
            
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = section.id === 'home' ? '/' : `#${section.id}`;
              break;
            }
          }
        }
        
        setActiveSection(currentSection);
      };

      // Initial check
      handleScroll();
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // For non-homepage routes, set active section to current path
      setActiveSection(location.pathname);
    }
  }, [location.pathname]);

  // Function to check if a nav link is active
  const isLinkActive = (href: string) => {
    // For homepage routes
    if (location.pathname === '/') {
      return activeSection === href;
    }
    
    // For other routes
    if (href === '/') {
      return location.pathname === '/';
    }
    
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // Set active section immediately for better UX
      setActiveSection(href);
      
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        window.location.href = `/${href}`;
      } else {
        smoothScrollTo(href);
      }
      setIsMobileMenuOpen(false);
    } else if (href === '/') {
      // Set home as active when clicking home
      setActiveSection('/');
    }
  };

  const navbarBg = scrollY > 100 ? 'bg-white/95' : 'bg-white/90';

  return (
    <nav className={`fixed top-0 w-full z-50 ${navbarBg} backdrop-blur-md shadow-lg transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-rose to-soft-pink rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-gem text-white text-lg"></i>
            </div>
            <span className="text-2xl font-playfair font-bold gradient-text">
              SajoSajao
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors duration-300 font-medium relative ${
                    isActive
                      ? 'text-rose font-semibold'
                      : 'text-gray-700 hover:text-rose'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-rose to-soft-pink rounded-full"></span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => onEnrollClick?.()}
              className="bg-gradient-to-r from-rose to-soft-pink text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-rose transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block transition-colors duration-300 py-2 px-4 rounded-lg ${
                    isActive
                      ? 'text-rose font-semibold bg-rose/10 border-l-4 border-rose'
                      : 'text-gray-700 hover:text-rose hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <i className="fas fa-chevron-right ml-2 text-sm"></i>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => {
                onEnrollClick?.();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full bg-gradient-to-r from-rose to-soft-pink text-white px-6 py-2 rounded-full text-center"
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
