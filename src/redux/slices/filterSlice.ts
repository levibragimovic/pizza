import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterSliceStateType = {
  categoryId: number;
  sortId: number;
  currentPage: number;
  searchValue: string;
};

const initialState: FilterSliceStateType = {
  categoryId: 0,
  sortId: 0,
  currentPage: 1,
  searchValue: ''
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortTypeId: (state, action: PayloadAction<number>) => {
      state.sortId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setParams: (state, action: PayloadAction<typeof initialState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortId = Number(action.payload.sortId);
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue: (state, action) => {
      console.log(action.payload);
      state.searchValue = action.payload;
    },
    onHomePage: (state) => {
      state.categoryId = 0;
      state.sortId = 0;
      state.currentPage = 1;
    }
  }
});

export const selectFiltersState = (state: RootState) => state.filters;

export const {
  setCategoryId,
  setSortTypeId,
  setCurrentPage,
  setParams,
  setSearchValue,
  onHomePage
} = filterSlice.actions;

export default filterSlice.reducer;
