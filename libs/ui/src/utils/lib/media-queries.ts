import { useMediaQuery } from '@mantine/hooks';

export const useBreakpoints = () => {
  const isMobile = useMediaQuery('(max-width: 48em)');
  const isTablet = useMediaQuery('(min-width: 48em) and (max-width: 75em)');
  const isDesktop = useMediaQuery('(min-width: 75em)');

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
