import Axios, { AxiosError } from 'axios';
import getConfig from 'next/config';

const API_BASE_URL = getConfig().publicRuntimeConfig.API_BASE_URL || 'http://localhost:3000';

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return Axios.isAxiosError(error);
}

export const axios = Axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) => {
    return Object.keys(params)
      .map((key) => {
        const val = params[key];
        if (Array.isArray(val)) {
          if (val.length) {
            return `${key}=${JSON.stringify(val)}`;
          } else {
            return null;
          }
        }
        if (typeof val === 'object') {
          return `${key}=${JSON.stringify(val)}`;
        }
        return `${key}=${val}`;
      })
      .filter((v) => !!v)
      .join('&');
  },
});
