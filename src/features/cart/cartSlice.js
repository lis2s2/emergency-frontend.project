import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    }
  }
}) 

export const { addToCart } = cartSlice.actions;
export const selectCartList = (state) => state.cart.cartItems; 
export default cartSlice.reducer;