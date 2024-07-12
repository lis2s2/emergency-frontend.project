import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    selectedItems: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    selectItem(state, action) {
      if (state.selectedItems.includes(action.payload)) {
        state.selectedItems = state.selectedItems.filter(id => id !== action.payload);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    selectAllItems(state) {
      if (state.selectedItems.length === state.items.length) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.items.map(item => item.no);
      }
    },
    addItem(state, action) {
      const existingItem = state.items.find(item => item.no === action.payload.no);
      if (existingItem) {
        existingItem.prodCount += action.payload.prodCount;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { setCartItems, selectItem, selectAllItems, addItem } = cartSlice.actions;

export default cartSlice.reducer;