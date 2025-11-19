import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Custom hook for Intersection Observer API
 * @param options - Intersection Observer options
 * @returns Ref and isIntersecting state
 */
export const useIntersectionObserver = (
  options: IntersectionOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: options.threshold ?? 0.1,
      root: options.root ?? null,
      rootMargin: options.rootMargin ?? '0px 0px -50px 0px'
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.root, options.rootMargin]);

  return [ref, isIntersecting];
};
