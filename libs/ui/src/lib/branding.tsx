import { IconGalaxy } from '@tabler/icons-react';
import { createContext, PropsWithChildren, useContext } from 'react';

export interface OctaveBranding {
  companyName?: string;
  slogan?: string;
  logo?: React.ReactNode;
}

const defaultBranding: Required<OctaveBranding> = {
  companyName: 'Octave Designs',
  slogan: 'The ui system you deserve',
  logo: <IconGalaxy />,
};

const OctaveBrandingContext =
  createContext<Required<OctaveBranding>>(defaultBranding);

export function OctaveBrandingProvider({
  children,
  branding,
}: PropsWithChildren<{ branding?: OctaveBranding }>) {
  return (
    <OctaveBrandingContext.Provider
      value={{
        companyName: branding?.companyName ?? defaultBranding.companyName,
        slogan: branding?.slogan ?? defaultBranding.slogan,
        logo: branding?.logo ?? defaultBranding.logo,
      }}
    >
      {children}
    </OctaveBrandingContext.Provider>
  );
}

export function useOctaveBranding(overrides?: OctaveBranding) {
  const branding = useContext(OctaveBrandingContext);

  return {
    companyName: overrides?.companyName ?? branding.companyName,
    slogan: overrides?.slogan ?? branding.slogan,
    logo: overrides?.logo ?? branding.logo,
  };
}
