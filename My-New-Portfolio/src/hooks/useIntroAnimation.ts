import { useState, useEffect } from 'react';
import { playIntroAnimation } from '../utils/animations';

/**
 * Hook to manage the loading state and trigger the intro animation
 */
export const useIntroAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const animation = playIntroAnimation(() => setIsLoading(false));
    
    return () => {
      animation.kill(); // Cleanup on unmount
    };
  }, []);

  return { isLoading };
};
