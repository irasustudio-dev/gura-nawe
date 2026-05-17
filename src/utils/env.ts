/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 */

const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[`VITE_${key}`] || process.env[key] || defaultValue;
  if (!value && !defaultValue) {
    console.warn(`Missing environment variable: ${key}`);
  }
  return value || '';
};

export const env = {
  // API Configuration
  API_URL: getEnv('API_URL', 'http://localhost:3000'),
  
  // Analytics
  GOOGLE_ANALYTICS_ID: getEnv('GOOGLE_ANALYTICS_ID'),
  
  // Sentry (Error Tracking)
  SENTRY_DSN: getEnv('SENTRY_DSN'),
  
  // App
  APP_ENV: getEnv('APP_ENV', 'development'),
  APP_NAME: 'GURA NAWE',
  APP_URL: getEnv('APP_URL', 'http://localhost:3000'),
  
  // Feature Flags
  ENABLE_ANALYTICS: getEnv('ENABLE_ANALYTICS', 'true') === 'true',
  ENABLE_ERROR_TRACKING: getEnv('ENABLE_ERROR_TRACKING', 'true') === 'true',
};

export const isDevelopment = env.APP_ENV === 'development';
export const isProduction = env.APP_ENV === 'production';
export const isStaging = env.APP_ENV === 'staging';
