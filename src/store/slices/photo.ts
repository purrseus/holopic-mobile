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
}

const initialState: IPhotoState = {
  uploadBottomSheetVisible: false,
  myPhotos: {
    photos: [],
    loading: false,
    error: false,
  },
};

const showUploadBottomSheet: CaseReducer<
  IPhotoState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.uploadBottomSheetVisible = payload;
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

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    showUploadBottomSheet,

    getMyPhotosRequest,
    getMyPhotosSuccess,
    getMyPhotosFailed,

    getMoreMyPhotosRequest,
    getMoreMyPhotosSuccess,
    getMoreMyPhotosFailed,
  },
});

export const photoActions = photoSlice.actions;
export default photoSlice.reducer;
