import { AxiosResponse } from 'axios';
import connectionInstance from './index';

export interface IAvatar {
  _id: string;
  url: string;
  publicId: string;
}

export enum Gender {
  NA = 'N/A',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IProfile {
  fullName: string;
  username: string;
  avatar: IAvatar;
  gender: Gender;
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

type TUserKey = 'uid' | 'images' | 'following' | 'followers';
export interface IUser extends Pick<IAccount, TUserKey> {
  isFollowing: boolean;
  profile: IProfile;
}

type TGetMyAccount = () => Promise<AxiosResponse<IAccount>>;
type TEditProfile = (
  data: Pick<IProfile, 'fullName' | 'username' | 'gender' | 'bio' | 'location'>,
) => Promise<AxiosResponse<IAccount>>;
type TGetUser = (uid: string) => Promise<AxiosResponse<IUser>>;
type TFollowUser = (uid: string) => Promise<AxiosResponse>;
type TGetFollow = (page: number) => Promise<AxiosResponse<IUser[]>>;
type TSearchUsers = (
  query: string,
  page: number,
) => Promise<AxiosResponse<IUser[]>>;

export const getMyAccount: TGetMyAccount = () =>
  connectionInstance.get('/user/my-account');

export const editProfile: TEditProfile = data =>
  connectionInstance.patch('/user/edit-profile', {
    fullName: data.fullName,
    username: data.username,
    gender: data.gender,
    bio: data.bio,
    location: data.location,
  });

export const getUser: TGetUser = uid => connectionInstance.get(`/user/${uid}`);

export const followUser: TFollowUser = uid =>
  connectionInstance.get(`/user/follow/${uid}`);

export const unfollowUser: TFollowUser = uid =>
  connectionInstance.get(`/user/unfollow/${uid}`);

export const getFollowing: TGetFollow = page =>
  connectionInstance.get(`/user/get-following?page=${page}`);

export const getFollowers: TGetFollow = page =>
  connectionInstance.get(`/user/get-followers?page=${page}`);

export const searchUsers: TSearchUsers = (query, page) =>
  connectionInstance.get(`/user/search?q=${query}&page=${page}`);
