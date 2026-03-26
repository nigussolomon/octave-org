import {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

export interface OctaveBranding {
  companyName?: string;
  slogan?: string;
}

const defaultBranding: Required<OctaveBranding> = {
  companyName: 'Octave Designs',
  slogan: 'The ui system you deserve',
};

const OctaveBrandingContext = createContext<Required<OctaveBranding>>(
  defaultBranding,
);

export function OctaveBrandingProvider({
  children,
  branding,
}: PropsWithChildren<{ branding?: OctaveBranding }>) {
  return (
    <OctaveBrandingContext.Provider
      value={{
        companyName: branding?.companyName ?? defaultBranding.companyName,
        slogan: branding?.slogan ?? defaultBranding.slogan,
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
  };
}
