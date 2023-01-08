import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItemType = {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  price: number;
  size: number;
  count: number;
};
interface ICartSlice {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: ICartSlice = {
  totalPrice: 0,
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
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
    minusItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((obj) => obj.id === action.payload);
      item && item.count--;
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

export const selectCartState = (state: RootState) => state.cart;
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
