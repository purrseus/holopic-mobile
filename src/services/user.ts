import { AxiosResponse } from 'axios';
import connectionInstance from './index';

interface IAvatar {
  _id: string;
  url: string;
  publicId: string;
}

export interface IProfile {
  fullName: string;
  username: string;
  avatar: IAvatar;
  gender: 'N/A' | 'MALE' | 'FEMALE';
  bio: string;
  location: string;
}

export interface IAccount {
  _id: string;
  email?: string;
  phoneNumber: string;
  uid: string;
  profile: IProfile;
  myLikes?: number;
  followers?: number;
  following?: number;
  images?: number;
  isFollowing?: boolean;
}

type TGetMyAccount = () => Promise<AxiosResponse<IAccount>>;

export const getMyAccount: TGetMyAccount = () =>
  connectionInstance.get('/user/my-account');
