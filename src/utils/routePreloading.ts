/**
 * Route preloading strategy for performance
 * Preload routes on user interaction to reduce navigation time
 */

export type RoutePreloadTiming = 'hover' | 'focus' | 'idle' | 'manual';

/**
 * Preload route when user hovers over link
 */
export const createPrefetchableLink = (href: string) => {
  const routeMap: Record<string, () => Promise<any>> = {
    '/marketplace': () => import('../pages/Marketplace'),
    '/services': () => import('../pages/Services'),
    '/about': () => import('../pages/About'),
    '/contact': () => import('../pages/Contact'),
    '/product/:id': () => import('../pages/ProductDetail'),
  };

  const preloadRoute = () => {
    const loader = routeMap[href] || routeMap[Object.keys(routeMap).find(key => href.startsWith(key.replace(':id', '')))];
    if (loader) {
      loader().catch(() => {
        // Silently fail if preload fails
      });
    }
  };

  return {
    href,
    onMouseEnter: preloadRoute,
    onFocus: preloadRoute,
  };
};

/**
 * Preload route on idle time
 */
export const preloadRoutesOnIdle = (routes: string[]) => {
  if ('requestIdleCallback' in window) {
    routes.forEach((route) => {
      (window as any).requestIdleCallback(() => {
        const link = createPrefetchableLink(route);
        link.onMouseEnter();
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      routes.forEach((route) => {
        const link = createPrefetchableLink(route);
        link.onMouseEnter();
      });
    }, 2000);
  }
};

/**
 * Performance observer for route timing
 */
export const observeRouteTiming = (routeName: string) => {
  if ('performance' in window) {
    const now = performance.now();
    return {
      mark: () => {
        performance.mark(`route-${routeName}-start`);
      },
      measure: () => {
        performance.mark(`route-${routeName}-end`);
        try {
          performance.measure(
            `route-${routeName}`,
            `route-${routeName}-start`,
            `route-${routeName}-end`
          );
        } catch (e) {
          // Browser doesn't support this measure
        }
      },
    };
  }
  return {
    mark: () => {},
    measure: () => {},
  };
};
