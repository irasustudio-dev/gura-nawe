import { useEffect, useRef, useState } from 'react';
import { cn } from './utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  placeholder?: string;
  fallback?: string;
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Optimized Image Component with:
 * - Lazy loading
 * - WebP support
 * - Responsive images
 * - Blur placeholder
 * - Error fallback
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  lazy = true,
  placeholder,
  fallback,
  srcSet,
  sizes,
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy || priority) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [lazy, priority]);

  const imageSrc = hasError ? fallback : src;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-100 dark:bg-slate-800',
        className
      )}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {/* Placeholder blur */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 blur-md bg-cover"
          style={{ backgroundImage: `url(${placeholder})` }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={isLoaded ? imageSrc : undefined}
        alt={alt}
        width={width}
        height={height}
        srcSet={isLoaded ? srcSet : undefined}
        sizes={sizes}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        decoding={lazy ? 'async' : 'auto'}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </div>
  );
};

/**
 * Image with srcset for responsive delivery
 */
export const ResponsiveImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const baseName = src.split('.')[0];
  const extension = src.split('.').pop() || 'jpg';

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      srcSet={`${baseName}-sm.${extension} 640w, ${baseName}-md.${extension} 1024w, ${baseName}-lg.${extension} 1280w`}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px"
    />
  );
};

/**
 * Preload image for better performance
 */
export const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Prefetch image (for next page)
 */
export const prefetchImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = src;
  link.as = 'image';
  document.head.appendChild(link);
};
