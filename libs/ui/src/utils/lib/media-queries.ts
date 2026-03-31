import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export const useBreakpoints = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const isMobile = useMediaQuery('(max-width: 48em)');
  const isTablet = useMediaQuery('(min-width: 48em) and (max-width: 75em)');
  const isDesktop = useMediaQuery('(min-width: 75em)');

  if (!mounted) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
