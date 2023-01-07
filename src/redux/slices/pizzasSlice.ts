import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Params = {
  currentPage: number;
  category: number;
  sortValue: string;
  searchValue: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchAllPizzas',
  async (params: Params) => {
    const { currentPage, category, sortValue, searchValue } = params;
    const { data } = await axios.get(
      `https://63a08129e3113e5a5c3f9cd7.mockapi.io/items?page=${currentPage}&limit=4${category}sortBy=${sortValue}&order=asc&filter=${searchValue}`
    );
    return data;
  }
);

export const getPizzaItem = createAsyncThunk(
  'getPizzaItem',
  async (id: string) => {
    const { data } = await axios.get(
      `https://63a08129e3113e5a5c3f9cd7.mockapi.io/items/${id}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
  pizzaItem: {}
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.items = action.payload;
    },
    setPizzaItem: (state, action) => {
      console.log('action: ', action.payload);
      state.pizzaItem = action.payload;
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
    builder.addCase(getPizzaItem.pending, (state) => {
      state.status = 'loading';
      state.pizzaItem = {};
    });
    builder.addCase(getPizzaItem.fulfilled, (state, action) => {
      state.pizzaItem = action.payload;
      state.status = 'success';
    });
    builder.addCase(getPizzaItem.rejected, (state) => {
      state.status = 'error';
      state.pizzaItem = {};
    });
  }
});

export const { setPizzas, setPizzaItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;
