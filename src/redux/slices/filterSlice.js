import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortTypeId: 0,
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
      state.sortTypeId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const { setCategoryId, setSortTypeId, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
