import { AxiosResponse } from 'axios';
import connectionInstance from './index';

interface IHolopicApi {
  refreshToken: (refreshToken: string) => Promise<AxiosResponse>;
}

const HolopicApi = {} as IHolopicApi;

HolopicApi.refreshToken = refreshToken => {
  return connectionInstance.post('/auth/refresh-token', { refreshToken });
};

export default HolopicApi;
