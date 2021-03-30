import { IUploadPhotoParams } from '@navigators/app-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccount, IProfile } from '@services/user';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { photoActions } from './photo';

export interface IEditProfilePayloadAction {
  values: Partial<IProfile>;
  publicId?: string;
  newAvatar?: IUploadPhotoParams;
}
interface IUserState {
  user?: IAccount;
  loading: boolean;
  error?: boolean;
}

const initialState: IUserState = {
  loading: false,
  error: false,
};

const getUserRequest: CaseReducer<IUserState> = state => {
  delete state.error;
  state.loading = true;
};

const getUserSuccess: CaseReducer<IUserState, PayloadAction<IAccount>> = (
  state,
  { payload },
) => {
  state.loading = false;
  state.error = false;
  state.user = payload;
};

const getUserFailed: CaseReducer<IUserState> = state => {
  state.loading = false;
  state.error = true;
};

const editProfileRequest: CaseReducer<
  IUserState,
  PayloadAction<IEditProfilePayloadAction>
> = state => {
  state.loading = true;
};

const editProfileSuccess: CaseReducer<IUserState> = state => {
  state.loading = false;
  state.error = false;
};

const editProfileFailed: CaseReducer<IUserState> = state => {
  state.loading = false;
  state.error = true;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest,
    getUserSuccess,
    getUserFailed,

    editProfileRequest,
    editProfileSuccess,
    editProfileFailed,
  },
  extraReducers: {
    [photoActions.uploadAPhoto.type]: state => {
      if (typeof state.user?.images === 'number') {
        state.user.images += 1;
      }
    },
  },
});

const authPersistConfig: any = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user'],
  stateReconciler: autoMergeLevel2,
};

export const userActions = userSlice.actions;
export default persistReducer<IUserState>(authPersistConfig, userSlice.reducer);
