import AsyncStorage from '@react-native-community/async-storage';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '@services/photo';
import { IUser } from '@services/user';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

interface SearchStatus<T> {
  result: T[];
  full: boolean;
  loading: boolean;
  error?: boolean;
}

interface ISearchState {
  keywords: string[];
  users: SearchStatus<IUser>;
  photos: SearchStatus<IPhoto>;
}

const initialState: ISearchState = {
  keywords: [],
  users: {
    result: [],
    full: false,
    loading: false,
    error: false,
  },
  photos: {
    result: [],
    full: false,
    loading: false,
    error: false,
  },
};

const removeASearchKeyword: CaseReducer<ISearchState, PayloadAction<string>> = (
  state,
  { payload },
) => {
  state.keywords.splice(
    state.keywords.findIndex(keyword => keyword === payload),
    1,
  );
};

const clearSearchKeywords: CaseReducer<ISearchState> = state => {
  state.keywords.length = 0;
};

const searchKeywordRequest: CaseReducer<ISearchState, PayloadAction<string>> = (
  state,
  { payload },
) => {
  state.keywords.unshift(payload);
  if (state.keywords.length > 20) {
    state.keywords.length = 20;
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchKeywordRequest,
    removeASearchKeyword,
    clearSearchKeywords,
  },
});

const searchPersistConfig: any = {
  key: 'search',
  storage: AsyncStorage,
  whitelist: ['keywords'],
  stateReconciler: autoMergeLevel2,
};

export const searchActions = searchSlice.actions;
export default persistReducer<ISearchState>(
  searchPersistConfig,
  searchSlice.reducer,
);
