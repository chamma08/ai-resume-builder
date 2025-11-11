import { useState, useEffect } from 'react';

/**
 * OptimizedImage component for lazy loading images with blur placeholder
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {boolean} priority - Load immediately (for above-the-fold images)
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');

  useEffect(() => {
    if (!priority) {
      // Lazy load images that are not priority
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
        }
      );

      const imageElement = document.getElementById(`img-${src}`);
      if (imageElement) {
        observer.observe(imageElement);
      }

      return () => observer.disconnect();
    }
  }, [src, priority]);

  return (
    <img
      id={`img-${src}`}
      src={imageSrc}
      alt={alt}
      className={`${className} ${!isLoaded && !priority ? 'blur-sm' : ''} transition-all duration-300`}
      onLoad={() => setIsLoaded(true)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;
