import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {requireAuthorization} from '../store/action.ts';
import {AuthStatus} from '../const.ts';
import {AppDispatch} from '../store/indexStore.ts';

export const TOKEN_KEY = 'six-cities-token';

export function createAPI(): AxiosInstance {
  const api: AxiosInstance = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: 5000,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  return api;
}

export function setupResponseInterceptor(api: AxiosInstance, dispatch: AppDispatch): void {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dispatch(requireAuthorization(AuthStatus.NoAuth));
        localStorage.removeItem(TOKEN_KEY);
      }
      return Promise.reject(error);
    }
  );
}
