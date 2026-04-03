export interface SdkConfig {
  url?: string;
}

let config: SdkConfig = {
  url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
};

export const initSdk = (newConfig: Partial<SdkConfig>) => {
  config = { ...config, ...newConfig };
};

export const getConfig = () => config;
