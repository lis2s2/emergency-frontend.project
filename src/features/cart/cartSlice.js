import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedItems: [],
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    selectItem(state, action) {
      const item = action.payload;
      if (state.selectedItems.includes(item)) {
        state.selectedItems = state.selectedItems.filter(i => i !== item);
      } else {
        state.selectedItems.push(item);
      }
    },
    selectAllItems(state) {
      if (state.selectedItems.length === state.items.length) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.items.map(item => item.no);
      }
    },
  },
}) 

export const { setCartItems, selectItem, selectAllItems } = cartSlice.actions;
export const selectedItems = (state) => state.cart.selectedItems; 
export const cartList = (state) => state.cart.items;
export default cartSlice.reducer;