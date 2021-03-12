import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

interface IToast {
  message: string;
  duration?: number;
}

interface ICommonState {
  loading: boolean;
  toast: IToast;
}

const initialState: ICommonState = {
  loading: false,
  toast: {
    message: '',
  },
};

const showOverlayLoading: CaseReducer<ICommonState> = state => {
  state.loading = true;
};

const hideOverlayLoading: CaseReducer<ICommonState> = state => {
  state.loading = false;
};

const showToast: CaseReducer<ICommonState, PayloadAction<IToast>> = (
  state,
  { payload },
) => {
  state.toast = payload;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showOverlayLoading,
    hideOverlayLoading,
    showToast,
  },
});

export const commonActions = commonSlice.actions;
const reducer = commonSlice.reducer;
export default reducer;
