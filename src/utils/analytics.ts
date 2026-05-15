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
 * Sentry Error Tracking Integration
 */
export const initializeSentry = async () => {
  if (!env.SENTRY_DSN || !env.ENABLE_ERROR_TRACKING) {
    return;
  }

  try {
    const Sentry = await import('@sentry/react');
    const { CaptureConsole } = await import('@sentry/integrations');

    Sentry.init({
      dsn: env.SENTRY_DSN,
      environment: env.APP_ENV,
      integrations: [
        new CaptureConsole({
          levels: ['error', 'warn'],
        }),
      ],
      tracesSampleRate: env.APP_ENV === 'production' ? 0.1 : 1.0,
      release: '1.0.0',
    });
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
};

/**
 * Log custom errors to Sentry
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  if (!env.ENABLE_ERROR_TRACKING) {
    console.error('Error:', error, context);
    return;
  }

  try {
    const Sentry = require('@sentry/react');
    Sentry.captureException(error, { contexts: { custom: context } });
  } catch (e) {
    console.error('Error:', error, context);
  }
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (!env.ENABLE_ERROR_TRACKING) {
    console.log(message);
    return;
  }

  try {
    const Sentry = require('@sentry/react');
    Sentry.captureMessage(message, level);
  } catch (e) {
    console.log(message);
  }
};
