// Analytics tracking hooks for React components
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

// Hook to track page views automatically
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = document.title;
    const fullUrl = window.location.origin + location.pathname + location.search;
    
    // Track page view
    trackPageView(fullUrl, pageTitle);
  }, [location]);
};

// Hook to track scroll depth
export const useScrollTracking = () => {
  useEffect(() => {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll milestones
        thresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            import('../utils/analytics').then(({ trackScrollDepth }) => {
              trackScrollDepth(threshold);
            });
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Hook to track time spent on page
export const useTimeTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent >= 10) { // Only track if user spent at least 10 seconds
        import('../utils/analytics').then(({ trackTimeOnPage }) => {
          trackTimeOnPage(timeSpent, location.pathname);
        });
      }
    };
  }, [location]);
};