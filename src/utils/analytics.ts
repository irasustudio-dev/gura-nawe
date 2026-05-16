import { env } from './env';

/**
 * Initialize Google Analytics
 */
export const initializeGA = () => {
  if (!env.GOOGLE_ANALYTICS_ID || !env.ENABLE_ANALYTICS) {
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', env.GOOGLE_ANALYTICS_ID);
};

/**
 * Track page views
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!env.ENABLE_ANALYTICS || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('config', env.GOOGLE_ANALYTICS_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (!env.ENABLE_ANALYTICS || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', eventName, eventData || {});
};

/**
 * Track conversions
 */
export const trackConversion = (value: number, currency: string = 'USD') => {
  trackEvent('purchase', {
    value,
    currency,
  });
};

/**
 * Track user interactions
 */
export const trackProductView = (productId: string, productName: string, price: number) => {
  trackEvent('view_item', {
    items: [
      {
        item_id: productId,
        item_name: productName,
        price,
      },
    ],
  });
};

export const trackAddToCart = (productId: string, productName: string, price: number) => {
  trackEvent('add_to_cart', {
    items: [
      {
        item_id: productId,
        item_name: productName,
        price,
      },
    ],
  });
};

export const trackSearch = (searchQuery: string) => {
  trackEvent('search', {
    search_term: searchQuery,
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'contact',
  });
};

export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', {
    form_name: formType,
  });
};

/**
 * Sentry Error Tracking Integration (Optional - not installed)
 */
export const initializeSentry = async () => {
  if (!env.SENTRY_DSN || !env.ENABLE_ERROR_TRACKING) {
    return;
  }

  try {
    // Sentry is optional - error tracking disabled
    // To enable: npm install @sentry/react @sentry/integrations
    console.log('Error tracking configured but Sentry not installed');
    return;
  } catch (error) {
    console.warn('Failed to initialize Sentry:', error);
  }
};

/**
 * Log custom errors (Sentry not installed)
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  console.error('Error:', error, context);
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  console.log(message);
};
