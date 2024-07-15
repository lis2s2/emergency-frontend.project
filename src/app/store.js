import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "../features/member/memberSlice";
import cartReducer from "../features/cart/cartSlice";

// 전역 상태를 보관하는 저장소 만들기
export const store = configureStore({
  reducer: {
    member: memberReducer,
    cart: cartReducer,
  }
});