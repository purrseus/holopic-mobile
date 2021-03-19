import { IUploadPhotoParams } from '@navigators/app-stack';
import { AxiosResponse } from 'axios';
import connectionInstance from './index';

export interface IPhoto {
  _id: string;
  status: string;
  title: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  user: string;
  tags: string[];
  view: number;
  likes: number;
  liked: boolean;
}

type TUploadPhoto = (
  title: string,
  tags: string,
  photo: IUploadPhotoParams,
) => Promise<AxiosResponse>;

type TGetPhotos = (page: number) => Promise<AxiosResponse<IPhoto[]>>;
type TGetUserPhotos = (
  uid: string,
  page: number,
) => Promise<AxiosResponse<IPhoto[]>>;

export const uploadPhoto: TUploadPhoto = (title, tags, photo) => {
  const data = new FormData();
  data.append('title', title);
  data.append('tags', tags);

  data.append('image', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  return connectionInstance.post('/image/upload-image', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getNewPhotos: TGetPhotos = page =>
  connectionInstance.get(`/image/new-images?page=${page}`);

export const getMyPhotos: TGetPhotos = page =>
  connectionInstance.get(`/image/my-images?page=${page}`);

export const getUserPhotos: TGetUserPhotos = (uid, page) =>
  connectionInstance.get(`/image/images?userId=${uid}&page=${page}`);
