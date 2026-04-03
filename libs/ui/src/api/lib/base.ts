import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '../../utils/lib/cookies';

import { getConfig } from './config';

const baseQuery = (args: any, api: any, extraOptions: any) => {
  const { url } = getConfig();
  return fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  })(args, api, extraOptions);
};

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();
    }

    if (refreshToken) {
      const { url } = getConfig();
      const refreshBaseQuery = fetchBaseQuery({
        baseUrl: url,
      });

      const refreshResult = await refreshBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      const data = (
        refreshResult.data as {
          data: { refresh_token: string; access_token: string };
        }
      )?.data;

      if (data?.access_token) {
        setTokens(data.access_token, data.refresh_token);
        result = await baseQuery(args, api, extraOptions);
      } else {
        clearTokens();
      }
    }
  }

  return result;
};
