import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const AUTH_USER_KEY = 'auth_user';

export const setTokens = (accessToken: string, refreshToken?: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(AUTH_USER_KEY);
};
