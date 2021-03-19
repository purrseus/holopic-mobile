import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPhotoState {
  uploadBottomSheetVisible: boolean;
}

const initialState: IPhotoState = {
  uploadBottomSheetVisible: false,
};

const showUploadBottomSheet: CaseReducer<
  IPhotoState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.uploadBottomSheetVisible = payload;
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    showUploadBottomSheet,
  },
});

export const photoActions = photoSlice.actions;
export default photoSlice.reducer;
