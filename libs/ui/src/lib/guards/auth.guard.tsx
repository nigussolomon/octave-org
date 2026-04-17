import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  isTokenValid,
} from '../../utils/lib/cookies';

type TokenValidationFn = (token: string) => boolean;
type GuardConditionFn = (context: AuthGuardConditionContext) => boolean;

const isBrowserRuntime = () =>
  typeof (globalThis as { document?: unknown }).document !== 'undefined';

export interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  onLoadingStateChange?: (isLoading: boolean) => void;
  authRoute?: string;
  devBypass?: boolean;
  accessToken?: string;
  refreshToken?: string;
  requireRefreshToken?: boolean;
  clearInvalidTokens?: boolean;
  clockSkewSeconds?: number;
  validateToken?: TokenValidationFn;
  customConditions?: GuardConditionFn[];
  onUnauthorized?: () => void;
}

export interface AuthGuardConditionContext {
  accessToken?: string;
  refreshToken?: string;
  hasValidAccessToken: boolean;
  hasValidRefreshToken: boolean;
  hasRequiredRefreshToken: boolean;
}

const getCookieTokens = () => {
  if (!isBrowserRuntime()) {
    return { accessToken: undefined, refreshToken: undefined };
  }

  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  };
};

const getLocation = () =>
  (
    globalThis as {
      location?: { pathname?: string; assign?: (url: string) => void };
    }
  ).location;

const isAuthRoutePath = (authRoute: string, pathname?: string) => {
  if (!pathname) return false;
  return pathname === authRoute || pathname.startsWith(`${authRoute}/`);
};

export default function AuthGuard({
  children,
  fallback = null,
  loadingFallback = null,
  onLoadingStateChange,
  authRoute,
  devBypass = false,
  accessToken,
  refreshToken,
  requireRefreshToken = false,
  clearInvalidTokens = true,
  clockSkewSeconds = 0,
  validateToken,
  customConditions = [],
  onUnauthorized,
}: AuthGuardProps) {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevBypassed = devBypass && !isProduction;

  const [isCheckingTokens, setIsCheckingTokens] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsCheckingTokens(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const cookieTokens = getCookieTokens();

  const resolvedAccessToken = accessToken ?? cookieTokens.accessToken;
  const resolvedRefreshToken = refreshToken ?? cookieTokens.refreshToken;

  const tokenValidator =
    validateToken ?? ((token: string) => isTokenValid(token, clockSkewSeconds));

  const hasValidAccessToken =
    !!resolvedAccessToken && tokenValidator(resolvedAccessToken);

  const hasValidRefreshToken =
    !!resolvedRefreshToken && tokenValidator(resolvedRefreshToken);

  const hasRequiredRefreshToken = !requireRefreshToken || hasValidRefreshToken;

  const conditionContext: AuthGuardConditionContext = {
    accessToken: resolvedAccessToken,
    refreshToken: resolvedRefreshToken,
    hasValidAccessToken,
    hasValidRefreshToken,
    hasRequiredRefreshToken,
  };

  const passesCustomConditions = customConditions.every((condition) => {
    try {
      return condition(conditionContext);
    } catch {
      return false;
    }
  });

  const hasValidTokenState =
    (hasValidAccessToken || hasValidRefreshToken) && hasRequiredRefreshToken;
  const isAuthorized = hasValidTokenState && passesCustomConditions;

  const currentPath = getLocation()?.pathname;
  const isOnAuthRoute = authRoute
    ? isAuthRoutePath(authRoute, currentPath)
    : false;
  const shouldRedirectToAuth =
    !isCheckingTokens &&
    !isAuthorized &&
    !isDevBypassed &&
    !!authRoute &&
    isBrowserRuntime() &&
    !isOnAuthRoute;
  const isGuardLoading = isCheckingTokens || shouldRedirectToAuth;

  useEffect(() => {
    if (!isCheckingTokens && !isAuthorized) {
      if (!hasValidTokenState && clearInvalidTokens && isBrowserRuntime()) {
        clearTokens();
      }

      onUnauthorized?.();
    }
  }, [
    isAuthorized,
    isCheckingTokens,
    hasValidTokenState,
    clearInvalidTokens,
    onUnauthorized,
  ]);

  useLayoutEffect(() => {
    if (shouldRedirectToAuth && authRoute) {
      getLocation()?.assign?.(authRoute);
    }
  }, [shouldRedirectToAuth, authRoute]);

  useEffect(() => {
    onLoadingStateChange?.(isGuardLoading);
  }, [isGuardLoading, onLoadingStateChange]);

  if (isGuardLoading) {
    return loadingFallback;
  }

  if (isDevBypassed) {
    return children;
  }

  if (!isAuthorized) {
    return fallback;
  }

  return children;
}
