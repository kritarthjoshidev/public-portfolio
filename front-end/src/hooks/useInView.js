import { useState, useEffect, useRef } from 'react';

/**
 * useInView – returns [ref, inView]
 * The ref should be attached to the element to observe.
 * inView becomes true once the element enters the viewport.
 */
export const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return [ref, inView];
};
