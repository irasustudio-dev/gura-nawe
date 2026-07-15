import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
}

const defaultMeta: MetaConfig = {
  title: 'GURA NAWE - High-End Digital Assets Marketplace',
  description: 'GURA NAWE is a premium digital assets marketplace for creator accounts, social media assets, and growth services with secure WhatsApp-based support.',
  image: 'https://guranawe.rw/og-image.jpg',
  type: 'website',
};

export const useSEO = (config: Partial<MetaConfig> = {}) => {
  const location = useLocation();
  const meta = { ...defaultMeta, ...config };

  useEffect(() => {
    // Set title
    document.title = meta.title;

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    } else {
      const tag = document.createElement('meta');
      tag.name = 'description';
      tag.content = meta.description;
      document.head.appendChild(tag);
    }

    // Open Graph tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', meta.title);
    updateOrCreateMeta('og:description', meta.description);
    updateOrCreateMeta('og:type', meta.type || 'website');
    if (meta.image) {
      updateOrCreateMeta('og:image', meta.image);
    }

    // Canonical URL
    const canonical = meta.canonical || `https://guranawe.rw${location.pathname}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonical);

    // Twitter Card
    const updateTwitter = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitter('twitter:card', 'summary_large_image');
    updateTwitter('twitter:title', meta.title);
    updateTwitter('twitter:description', meta.description);
    if (meta.image) {
      updateTwitter('twitter:image', meta.image);
    }

  }, [location.pathname, meta]);
};

// Structured data for schema.org
export const generateStructuredData = (type: string, data: Record<string, any>) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  // Return as JSON string for manual insertion
  return JSON.stringify(baseSchema);
};

// Organization schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GURA NAWE',
  url: 'https://guranawe.rw',
  logo: 'https://guranawe.rw/logo.png',
  description: 'Digital marketplace for buying and selling social media assets',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+250722248567',
    email: 'hello@guranawe.rw',
  },
  sameAs: [
    'https://instagram.com/guranawe',
    'https://facebook.com/guranawe',
    'https://tiktok.com/@guranawe',
  ],
};

// BreadcrumbSchema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
