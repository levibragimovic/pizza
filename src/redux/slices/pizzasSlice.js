import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchAllPizzas',
  async (params) => {
    const { currentPage, category, sortValue, searchValue } = params;
    const { data } = await axios.get(
      `https://63a08129e3113e5a5c3f9cd7.mockapi.io/items?page=${currentPage}&limit=4${category}sortBy=${sortValue}&order=asc&filter=${searchValue}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading'
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log(action);
      state.status = 'error';
      state.items = [];
    });
  }
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
