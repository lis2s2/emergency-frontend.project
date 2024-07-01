import { createSlice } from "@reduxjs/toolkit";

// 로그인한 유저 정보를 담을 slice 만들기
const initialState = {
  member: "",
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    loginSuccess: (state, { payload: member }) => {
      state.member = member;
    },
    logoutSuccess: (state) => {
      state.member = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = memberSlice.actions;

export const selectMember = (state) => state.member.member;

export default memberSlice.reducer;
