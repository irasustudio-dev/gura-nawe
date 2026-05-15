import { lazy, Suspense, ReactNode } from 'react';
import { PageLoader } from './Loaders';

/**
 * Lazy loading utility for routes and components
 * Reduces initial bundle size by code splitting
 */

export const loadRoute = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  return lazy(importFunc);
};

/**
 * Lazy load with Suspense fallback
 */
export const LazyRoute = ({
  Component,
  fallback = <PageLoader />,
}: {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: ReactNode;
}) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

/**
 * Pre-load components before they're needed
 */
export const preloadComponent = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  importFunc();
};

/**
 * Eager load on user interaction (hover, focus)
 */
export const createInteractiveLazyComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
) => {
  let component: React.ComponentType<any> | null = null;

  const preload = () => {
    if (!component) {
      importFunc().then((mod) => {
        component = mod.default;
      });
    }
  };

  return {
    preload,
    Component: lazy(importFunc),
  };
};

/**
 * Intersection Observer for lazy loading
 * Load component when it comes into view
 */
export const createIntersectionLazyComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
) => {
  let hasBeenInView = false;

  return lazy(async () => {
    if (hasBeenInView) {
      return importFunc();
    }

    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (hasBeenInView) {
          clearInterval(checkInterval);
          importFunc().then(resolve);
        }
      }, 100);
    });
  });
};

/**
 * Mark component as viewed
 */
export const useIntersectionLazy = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      (window as any).__componentInView = true;
      observer.unobserve(entry.target);
    }
  });

  observer.observe(ref.current);
};
