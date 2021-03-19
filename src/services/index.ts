import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import Config from 'react-native-config';
import { getNewAccessToken } from './auth';

export const data: { refreshToken: string } = {
  refreshToken: '',
};

const connectionInstance: AxiosInstance = axios.create({
  baseURL: Config.HOLOPIC_API_URL,
  timeout: 20000,
});

export const setToken = (token: string) => {
  connectionInstance.defaults.headers.Authorization = token;
};

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
      setToken(response.headers.authorization);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401 && data.refreshToken !== '') {
      const originalRequest: AxiosRequestConfig = error.config;
      const newAccessToken: AxiosResponse = await getNewAccessToken(
        data.refreshToken,
      );
      originalRequest.headers.Authorization =
        newAccessToken.headers.authorization;
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
