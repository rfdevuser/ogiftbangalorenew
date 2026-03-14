import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = '885736280453742';

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Meta Pixel
    const initPixel = () => {
      if (window.fbq) return;

      const fbq = function (...args: unknown[]) {
        if ((fbq as any).callMethod) {
          (fbq as any).callMethod.apply(fbq, args);
        } else {
          (fbq as any).queue.push(args);
        }
      } as any;

      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      window.fbq = fbq;

      // Load the pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);

      // Initialize and track PageView
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    };

    initPixel();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
};

export default MetaPixel;
