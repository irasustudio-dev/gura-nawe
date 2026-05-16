/**
 * Service Worker Registration
 * Register service worker for offline support and performance
 */

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered:', registration);

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

/**
 * Unregister service worker (for cleanup)
 */
export const unregisterServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    console.log('Service Workers unregistered');
  } catch (error) {
    console.error('Failed to unregister Service Workers:', error);
  }
};
