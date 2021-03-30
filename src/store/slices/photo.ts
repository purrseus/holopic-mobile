import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '@services/photo';

interface IMyPhotos {
  photos: IPhoto[];
  loading: boolean;
  error?: boolean;
}

export interface IPhotoState {
  uploadBottomSheetVisible: boolean;
  myPhotos: IMyPhotos;
  likedPhotos: IMyPhotos;
}

const initialState: IPhotoState = {
  uploadBottomSheetVisible: false,
  myPhotos: {
    photos: [],
    loading: true,
    error: false,
  },
  likedPhotos: {
    photos: [],
    loading: true,
    error: false,
  },
};

const showUploadBottomSheet: CaseReducer<
  IPhotoState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.uploadBottomSheetVisible = payload;
};

const uploadAPhoto: CaseReducer<IPhotoState, PayloadAction<IPhoto>> = (
  state,
  { payload },
) => {
  state.myPhotos.photos.unshift(payload);
  if (state.myPhotos.photos.length > 20) {
    state.myPhotos.photos.length = 20;
  }
};

const likeAPhoto: CaseReducer<IPhotoState, PayloadAction<IPhoto>> = (
  state,
  { payload },
) => {
  state.likedPhotos.photos.unshift(payload);
  if (state.likedPhotos.photos.length > 20) {
    state.likedPhotos.photos.length = 20;
  }
};

const getMyPhotosRequest: CaseReducer<IPhotoState> = state => {
  state.myPhotos.loading = true;
};

const getMyPhotosSuccess: CaseReducer<IPhotoState, PayloadAction<IPhoto[]>> = (
  state,
  { payload },
) => {
  state.myPhotos.loading = false;
  delete state.myPhotos.error;
  state.myPhotos.photos = payload;
};

const getMyPhotosFailed: CaseReducer<IPhotoState> = state => {
  state.myPhotos.loading = false;
  state.myPhotos.error = true;
};

const getMoreMyPhotosRequest: CaseReducer<IPhotoState> = state => {
  state.myPhotos.loading = true;
};

const getMoreMyPhotosSuccess: CaseReducer<
  IPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.myPhotos.loading = false;
  delete state.myPhotos.error;
  state.myPhotos.photos = [...state.myPhotos.photos, ...payload];
};

const getMoreMyPhotosFailed: CaseReducer<IPhotoState> = state => {
  state.myPhotos.loading = false;
  state.myPhotos.error = true;
};

const getLikedPhotosRequest: CaseReducer<IPhotoState> = state => {
  state.likedPhotos.loading = true;
};

const getLikedPhotosSuccess: CaseReducer<
  IPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.likedPhotos.loading = false;
  delete state.likedPhotos.error;
  state.likedPhotos.photos = payload;
};

const getLikedPhotosFailed: CaseReducer<IPhotoState> = state => {
  state.likedPhotos.loading = false;
  state.likedPhotos.error = true;
};

const getMoreLikedPhotosRequest: CaseReducer<IPhotoState> = state => {
  state.likedPhotos.loading = true;
};

const getMoreLikedPhotosSuccess: CaseReducer<
  IPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.likedPhotos.loading = false;
  delete state.likedPhotos.error;
  state.likedPhotos.photos = [...state.likedPhotos.photos, ...payload];
};

const getMoreLikedPhotosFailed: CaseReducer<IPhotoState> = state => {
  state.likedPhotos.loading = false;
  state.likedPhotos.error = true;
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    uploadAPhoto,
    likeAPhoto,
    showUploadBottomSheet,

    getMyPhotosRequest,
    getMyPhotosSuccess,
    getMyPhotosFailed,
    getMoreMyPhotosRequest,
    getMoreMyPhotosSuccess,
    getMoreMyPhotosFailed,

    getLikedPhotosRequest,
    getLikedPhotosSuccess,
    getLikedPhotosFailed,
    getMoreLikedPhotosRequest,
    getMoreLikedPhotosSuccess,
    getMoreLikedPhotosFailed,
  },
});

export const photoActions = photoSlice.actions;
export default photoSlice.reducer;
