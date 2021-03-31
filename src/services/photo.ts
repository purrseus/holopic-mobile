import { IUploadPhotoParams } from '@navigators/app-stack';
import { AxiosResponse } from 'axios';
import connectionInstance from './index';
import { IAvatar } from './user';

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
  views: number;
  likes: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
  likeIndex?: number;
}

type TUploadPhoto = (
  title: string,
  tags: string,
  photo: IUploadPhotoParams,
) => Promise<AxiosResponse<IPhoto>>;

type TChangeAvatar = (
  publicId: string,
  photo: IUploadPhotoParams,
) => Promise<AxiosResponse<IAvatar>>;

type TEditPhoto = (
  title: string,
  tags: string,
  publicId: string,
) => Promise<AxiosResponse>;

type TGetPhotos = (page: number) => Promise<AxiosResponse<IPhoto[]>>;
type TGetUserPhotos = (
  uid: string,
  page: number,
) => Promise<AxiosResponse<IPhoto[]>>;
type TLikePhoto = (publicId: string) => Promise<AxiosResponse>;
type TGetPhoto = (publicId: string) => Promise<AxiosResponse<IPhoto>>;
type TDeletePhoto = (publicId: string) => Promise<AxiosResponse>;

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

export const changeAvatar: TChangeAvatar = (publicId, photo) => {
  const data = new FormData();
  data.append('publicId', publicId);

  data.append('avatar', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  return connectionInstance.post('/image/change-avatar', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const editPhoto: TEditPhoto = (title, tags, publicId) =>
  connectionInstance.patch(`/image/edit-image/${publicId}`, { title, tags });

export const deletePhoto: TDeletePhoto = publicId =>
  connectionInstance.delete(`/image/delete-image/${publicId}`);

export const getNewPhotos: TGetPhotos = page =>
  connectionInstance.get(`/image/new-images?page=${page}`);

export const getMyPhotos: TGetPhotos = page =>
  connectionInstance.get(`/image/my-images?page=${page}`);

export const getUserPhotos: TGetUserPhotos = (uid, page) =>
  connectionInstance.get(`/image/images?userId=${uid}&page=${page}`);

export const getPhoto: TGetPhoto = publicId =>
  connectionInstance.get(`/image/${publicId}`);

export const likePhoto: TLikePhoto = publicId =>
  connectionInstance.get(`/image/like/${publicId}`);

export const unlikePhoto: TLikePhoto = publicId =>
  connectionInstance.get(`/image/unlike/${publicId}`);

export const viewPhoto: TLikePhoto = publicId =>
  connectionInstance.get(`image/view/${publicId}`);

export const getLikedPhotos: TGetPhotos = page =>
  connectionInstance.get(`/image/my-likes?page=${page}`);
