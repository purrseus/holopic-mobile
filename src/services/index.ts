import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import Config from 'react-native-config';
import HolopicApi from './holopic-api';

export let refreshToken: string = '';

const connectionInstance: AxiosInstance = axios.create({
  baseURL: Config.HOLOPIC_API_URL,
  timeout: 20_000,
});

connectionInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

connectionInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      connectionInstance.defaults.headers.Authorization =
        response.headers.authorization;
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401 && refreshToken !== '') {
      const originalRequest: AxiosRequestConfig = error.config;
      const newAccessToken: AxiosResponse = await HolopicApi.refreshToken(
        refreshToken,
      );
      originalRequest.headers.Authorization = newAccessToken;
      return connectionInstance.request(originalRequest);
    }

    if (__DEV__) {
      console.error('API response error:', error);
    }

    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response?.data?.message));
    }
    return Promise.reject(error);
  },
);

export default connectionInstance;
