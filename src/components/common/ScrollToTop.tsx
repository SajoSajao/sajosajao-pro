import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't scroll to top if there's a hash in the URL (for section navigation)
    if (location.hash) {
      // For hash navigation, scroll to the element
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For regular navigation, scroll to top instantly
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
};