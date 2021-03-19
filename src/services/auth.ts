import { AxiosResponse } from 'axios';
import connectionInstance from './index';

export interface IToken {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

type TRefreshToken = (refreshToken: string) => Promise<AxiosResponse>;

type TLoginWithPhoneNumber = (data: {
  idToken: string;
}) => Promise<AxiosResponse<IToken>>;

type TLogout = () => Promise<AxiosResponse>;

export const getNewAccessToken: TRefreshToken = refreshToken =>
  connectionInstance.post('/auth/refresh-token', { refreshToken });

export const loginWithPhoneNumber: TLoginWithPhoneNumber = data =>
  connectionInstance.post('/auth/login/phone-number', data);

export const logout: TLogout = () => connectionInstance.get('/auth/logout');
