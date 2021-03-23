export enum HoloScreen {
  AUTH_STACK = 'AuthStack',
  LOADING = 'Loading',
  WELCOME = 'Welcome',

  LOGIN_STACK = 'LoginStack',
  LOGIN = 'Login',
  COUNTRIES_DIAL_CODE = 'CountriesDialCode',
  VERIFY_OTP = 'VerifyOTP',

  APP_STACK = 'AppStack',
  UPLOAD_PHOTO = 'UploadPhoto',
  PHOTO = 'Photo',

  TAB_BAR = 'TabBar',
  HOME = 'Home',
  SEARCH = 'Search',
  LIKES = 'Likes',
  MY_PROFILE = 'MyProfile',
}

export enum AuthStatus {
  VERIFYING = 'VERIFYING',
  FIST_TIME_LOGIN = 'FIRST_TIME_LOGIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  LOGGED_IN = 'LOGGED_IN',
}

export enum LoginStatus {
  Idle,
  PhoneNumberVerifying,
  SendOTPCode,
  RequestFailed,
  OTPCodeVerifying,
  LoginSuccess,
  LoginFailed,
}

export const BOTTOM_TAB_HEIGHT = 60;
