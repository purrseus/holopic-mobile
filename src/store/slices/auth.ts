import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStatus, LoginStatus } from '@constants';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export interface IPhonePrefix {
  flag: string;
  dialCode: string;
}

export interface IAuthState {
  status: AuthStatus;
  loginStatus: LoginStatus;
  loading: boolean;
  error?: boolean;
  refreshToken?: string;
  showWelcomeScreen: boolean;
  phonePrefix: IPhonePrefix;
}

const initialState: IAuthState = {
  status: AuthStatus.VERIFYING,
  loginStatus: LoginStatus.Idle,
  loading: false,
  error: false,
  showWelcomeScreen: true,
  phonePrefix: {
    flag: '🇦🇫',
    dialCode: '+93',
  },
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

const setDialCode: CaseReducer<IAuthState, PayloadAction<IPhonePrefix>> = (
  state,
  { payload },
) => {
  state.phonePrefix = payload;
};

const verifyPhoneNumberRequest: CaseReducer<
  IAuthState,
  PayloadAction<string>
> = state => {
  delete state.error;
  state.loading = true;
  state.loginStatus = LoginStatus.PhoneNumberVerifying;
};

const verifyPhoneNumberSuccess: CaseReducer<IAuthState> = state => {
  state.loading = false;
  state.error = false;
  state.loginStatus = LoginStatus.SendOTPCode;
};

const verifyPhoneNumberFailed: CaseReducer<IAuthState> = state => {
  state.loading = false;
  state.error = true;
  state.loginStatus = LoginStatus.RequestFailed;
};

const verifyOTPCodeRequest: CaseReducer<
  IAuthState,
  PayloadAction<string>
> = state => {
  delete state.error;
  state.loading = true;
  state.loginStatus = LoginStatus.OTPCodeVerifying;
};

const loginSuccess: CaseReducer<IAuthState, PayloadAction<string>> = (
  state,
  { payload },
) => {
  state.loading = false;
  state.error = false;
  state.refreshToken = payload;
  state.loginStatus = LoginStatus.LoginSuccess;
};

const loginFailed: CaseReducer<IAuthState> = state => {
  state.loading = false;
  state.error = true;
  state.loginStatus = LoginStatus.LoginFailed;
};

const logoutRequest: CaseReducer<IAuthState> = state => {
  delete state.error;
  state.loading = true;
};

const logoutSuccess: CaseReducer<IAuthState> = state => {
  delete state.refreshToken;
  state.loading = false;
  state.status = AuthStatus.UNAUTHORIZED;
  state.loginStatus = LoginStatus.Idle;
  state.phonePrefix = {
    flag: '🇦🇫',
    dialCode: '+93',
  };
};

const logoutFailed: CaseReducer<IAuthState> = state => {
  state.loading = false;
  state.error = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus,
    hideWelcomeScreen,
    setDialCode,

    verifyPhoneNumberRequest,
    verifyPhoneNumberSuccess,
    verifyPhoneNumberFailed,

    verifyOTPCodeRequest,
    loginSuccess,
    loginFailed,

    logoutRequest,
    logoutSuccess,
    logoutFailed,
  },
});

const authPersistConfig: any = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['refreshToken', 'showWelcomeScreen'],
  stateReconciler: autoMergeLevel2,
};

export const authActions = authSlice.actions;
export default persistReducer<IAuthState>(authPersistConfig, authSlice.reducer);
