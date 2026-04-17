import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const AUTH_USER_KEY = 'auth_user';

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const payload = parts[1]?.replace(/-/g, '+').replace(/_/g, '/');
  if (!payload) return null;

  const normalizedPayload = payload.padEnd(
    payload.length + ((4 - (payload.length % 4)) % 4),
    '=',
  );

  try {
    const decoded = globalThis.atob(normalizedPayload);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const getNumericClaim = (claim: unknown): number | null => {
  if (typeof claim === 'number') return claim;

  if (typeof claim === 'string') {
    const parsed = Number(claim);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
};

export const isTokenValid = (token?: string, clockSkewSeconds = 0): boolean => {
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);
  const notBefore = getNumericClaim(payload.nbf);
  const expiresAt = getNumericClaim(payload.exp);

  if (notBefore !== null && now + clockSkewSeconds < notBefore) {
    return false;
  }

  if (expiresAt === null) {
    return false;
  }

  return now + clockSkewSeconds < expiresAt;
};

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
