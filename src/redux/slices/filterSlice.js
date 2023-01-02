import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortId: 0,
  currentPage: 1
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortTypeId: (state, action) => {
      state.sortId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setParams: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortId = Number(action.payload.sortId);
      state.currentPage = Number(action.payload.currentPage);
    },
    onHomePage: (state) => {
      state.categoryId = 0;
      state.sortId = 0;
      state.currentPage = 1;
    }
  }
});

export const {
  setCategoryId,
  setSortTypeId,
  setCurrentPage,
  setParams,
  onHomePage
} = filterSlice.actions;

export default filterSlice.reducer;
