import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '@services/photo';
import { photoActions } from './photo';

interface IFollowingPhotoState {
  photos: IPhoto[];
  loading: boolean;
  error?: boolean;
  full: boolean;
}

const initialState: IFollowingPhotoState = {
  photos: [],
  loading: false,
  error: false,
  full: false,
};

const getFollowingPhotosRequest: CaseReducer<IFollowingPhotoState> = state => {
  state.loading = true;
  state.full = false;
};

const getFollowingPhotosSuccess: CaseReducer<
  IFollowingPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.loading = false;
  state.photos = payload;
  delete state.error;
  if (!payload.length || payload.length < 20) {
    state.full = true;
  }
};

const getFollowingPhotosFailed: CaseReducer<IFollowingPhotoState> = state => {
  state.loading = false;
  state.error = true;
};

const getMoreFollowingPhotosRequest: CaseReducer<IFollowingPhotoState> = state => {
  state.loading = true;
};

const getMoreFollowingPhotosSuccess: CaseReducer<
  IFollowingPhotoState,
  PayloadAction<IPhoto[]>
> = (state, { payload }) => {
  state.loading = false;
  state.photos = [...state.photos, ...payload];
  delete state.error;
  if (!payload.length || payload.length < 20) {
    state.full = true;
  }
};

const getMoreFollowingPhotosFailed: CaseReducer<IFollowingPhotoState> = state => {
  state.loading = false;
  state.error = true;
};

const followingPhotoSlice = createSlice({
  name: 'followPhotos',
  initialState,
  reducers: {
    getFollowingPhotosRequest,
    getFollowingPhotosSuccess,
    getFollowingPhotosFailed,

    getMoreFollowingPhotosRequest,
    getMoreFollowingPhotosSuccess,
    getMoreFollowingPhotosFailed,
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

export const followingPhotoActions = followingPhotoSlice.actions;
export default followingPhotoSlice.reducer;
