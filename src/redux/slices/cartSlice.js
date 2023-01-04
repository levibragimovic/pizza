import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((obj) => obj.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    minusItem: (state, action) => {
      const item = state.items.find((obj) => obj.id === action.payload.id);
      item.count--;
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const selectCartState = (state) => state.cart;
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
