/**
 * Performance Monitoring & Optimization
 * Tracks Core Web Vitals and performance metrics
 */

/**
 * Measure Core Web Vitals
 */
export const measureCoreWebVitals = () => {
  const vitals = {
    LCP: 0, // Largest Contentful Paint
    FID: 0, // First Input Delay
    CLS: 0, // Cumulative Layout Shift
    FCP: 0, // First Contentful Paint
    TTFB: 0, // Time to First Byte
  };

  // LCP
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.LCP = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Observer not supported
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          vitals.FID = entry.processingDuration;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Observer not supported
    }

    // CLS (Cumulative Layout Shift)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            vitals.CLS += entry.value;
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Observer not supported
    }
  }

  // FCP & TTFB from Navigation Timing
  if ('performance' in window) {
    try {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        vitals.FCP = navTiming.responseStart - navTiming.fetchStart;
        vitals.TTFB = navTiming.responseStart - navTiming.fetchStart;
      }
    } catch (e) {
      // Navigation Timing not supported
    }
  }

  return vitals;
};

/**
 * Track page load performance
 */
export const trackPageLoadPerformance = () => {
  if (!('performance' in window)) return null;

  try {
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navTiming) return null;

    return {
      dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
      tcp: navTiming.connectEnd - navTiming.connectStart,
      ttfb: navTiming.responseStart - navTiming.requestStart,
      download: navTiming.responseEnd - navTiming.responseStart,
      domParse: navTiming.domInteractive - navTiming.domLoading,
      domContent: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
      loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
      total: navTiming.loadEventEnd - navTiming.fetchStart,
    };
  } catch (e) {
    return null;
  }
};

/**
 * Monitor Long Tasks
 */
export const monitorLongTasks = (threshold = 50) => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.duration > threshold) {
          console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
        }
      });
    });
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long Task API not supported
  }
};

/**
 * Report performance metrics
 */
export const reportPerformanceMetrics = async (endpoint: string) => {
  try {
    const vitals = measureCoreWebVitals();
    const loadPerf = trackPageLoadPerformance();

    const payload = {
      vitals,
      loadPerformance: loadPerf,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Only report if we have metrics
    if (vitals.LCP > 0 || loadPerf?.total) {
      // Use sendBeacon if available (for reliability)
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, JSON.stringify(payload));
      } else {
        // Fallback to fetch
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    }
  } catch (error) {
    console.error('Failed to report performance metrics:', error);
  }
};

/**
 * Optimize Third-party Scripts Loading
 */
export const loadThirdPartyScript = (
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    crossOrigin?: boolean;
    timing?: 'critical' | 'high' | 'medium' | 'low';
  } = {}
) => {
  const script = document.createElement('script');
  script.src = src;

  // Set loading strategy based on priority
  switch (options.timing) {
    case 'critical':
      // Load immediately
      break;
    case 'high':
      script.async = true;
      break;
    case 'medium':
      script.defer = true;
      break;
    case 'low':
      script.async = true;
      // Load on idle
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          document.head.appendChild(script);
        });
        return;
      }
      break;
  }

  if (options.crossOrigin) {
    script.crossOrigin = 'anonymous';
  }

  document.head.appendChild(script);
};

/**
 * Resource hints for browser optimization
 */
export const addResourceHints = () => {
  const hints = [
    // DNS Prefetch for external services
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
    { rel: 'dns-prefetch', href: '//cdn.jsdelivr.net' },

    // Preconnect to critical origins
    { rel: 'preconnect', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: '//fonts.gstatic.com', crossOrigin: 'anonymous' },

    // Prefetch next navigation likely resources
    { rel: 'prefetch', href: '/static/marketplace-data.json' },
  ];

  hints.forEach(({ rel, href, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin) {
      link.crossOrigin = crossOrigin;
    }
    document.head.appendChild(link);
  });
};

/**
 * Debounce function for performance
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  } as T;
};

/**
 * Throttle function for performance
 */
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => {
  let inThrottle: boolean = false;

  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
};
