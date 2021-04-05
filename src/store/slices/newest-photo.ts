import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '@services/photo';
import { photoActions } from './photo';

interface INewestPhotoState {
  photos: IPhoto[];
  loading: boolean;
  error?: boolean;
  full: boolean;
}

const initialState: INewestPhotoState = {
  photos: [],
  loading: false,
  error: false,
  full: false,
};

const getNewestPhotosRequest: CaseReducer<INewestPhotoState> = state => {
  state.loading = true;
  state.full = false;
};

const getNewestPhotosSuccess: CaseReducer<
  INewestPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.loading = false;
  state.photos = payload;
  delete state.error;
  if (!payload.length || payload.length < 20) {
    state.full = true;
  }
};

const getNewestPhotosFailed: CaseReducer<INewestPhotoState> = state => {
  state.loading = false;
  state.error = true;
};

const getMoreNewestPhotosRequest: CaseReducer<INewestPhotoState> = state => {
  state.loading = true;
};

const getMoreNewestPhotosSuccess: CaseReducer<
  INewestPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.loading = false;
  state.photos = [...state.photos, ...payload];
  delete state.error;
  if (!payload.length || payload.length < 20) {
    state.full = true;
  }
};

const getMoreNewestPhotosFailed: CaseReducer<INewestPhotoState> = state => {
  state.loading = false;
  state.error = true;
};

const newestPhotoSlice = createSlice({
  name: 'newestPhotos',
  initialState,
  reducers: {
    getNewestPhotosRequest,
    getNewestPhotosSuccess,
    getNewestPhotosFailed,

    getMoreNewestPhotosRequest,
    getMoreNewestPhotosSuccess,
    getMoreNewestPhotosFailed,
  },
  extraReducers: builder => {
    builder
      .addCase(
        photoActions.likeAPhoto.type,
        (state, { payload }: PayloadAction<IPhoto>) => {
          const indexPhoto = state.photos.findIndex(
            photo => photo.publicId === payload.publicId,
          );
          if (indexPhoto !== -1) {
            state.photos[indexPhoto].liked = true;
            state.photos[indexPhoto].likes += 1;
          }
        },
      )
      .addCase(
        photoActions.unlikeAPhoto.type,
        (state, { payload }: PayloadAction<IPhoto>) => {
          const indexPhoto = state.photos.findIndex(
            photo => photo.publicId === payload.publicId,
          );
          if (indexPhoto !== -1) {
            state.photos[indexPhoto].liked = false;
            state.photos[indexPhoto].likes -= 1;
          }
        },
      );
  },
});

export const newestPhotoActions = newestPhotoSlice.actions;
export default newestPhotoSlice.reducer;
