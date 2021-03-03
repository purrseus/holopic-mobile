import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStatus } from '@constants';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export interface IAuthState {
  status: AuthStatus;
  firebaseToken?: string;
  refreshToken?: string;
  showWelcomeScreen: boolean;
}

const initialState: IAuthState = {
  status: AuthStatus.VERIFYING,
  showWelcomeScreen: true,
};

const changeAuthStatus: CaseReducer<IAuthState, PayloadAction<AuthStatus>> = (
  state,
  { payload },
) => {
  state.status = payload;
};

const hideWelcomeScreen: CaseReducer<IAuthState> = state => {
  state.status = AuthStatus.UNAUTHORIZED;
  state.showWelcomeScreen = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus,
    hideWelcomeScreen,
  },
});

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['refreshToken', 'showWelcomeScreen'],
  stateReconciler: autoMergeLevel2,
};

export const authActions = authSlice.actions;
export default persistReducer<IAuthState>(authPersistConfig, authSlice.reducer);
