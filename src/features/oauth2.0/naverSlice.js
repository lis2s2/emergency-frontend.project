// import { createSlice } from "@reduxjs/toolkit";

// // 로그인한 유저 정보를 담을 slice 만들기
// const initialState = {
//     naverLoginParams: {
//         client_id: process.env.VUE_APP_NAVER_CLIENT_ID,
//         redirect_uri: process.env.VUE_APP_NAVER_REDIRECT_URI,
//         response_type: 'code',
//         state: '',
//     },
//     token: null,
//     user: null,
// }

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_NAVER_STATE':
//         return {
//           ...state,
//           naverLoginParams: {
//             ...state.naverLoginParams,
//             state: action.payload,
//           },
//         };
//       case 'SET_TOKEN':
//         return {
//           ...state,
//           token: action.payload,
//         };
//       case 'SET_USER':
//         return {
//           ...state,
//           user: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   // 액션 생성자
//   export const setNaverState = (state) => ({
//     type: 'SET_NAVER_STATE',
//     payload: state,
//   });
  
//   export const setToken = (token) => ({
//     type: 'SET_TOKEN',
//     payload: token,
//   });
  
//   export const setUser = (user) => ({
//     type: 'SET_USER',
//     payload: user,
//   });
  
//   export default authReducer;

// // const naverSlice = createSlice({
// //   name: "naver",
// //   initialState,
// //   reducers: {
// //     loginSuccess: (state, { payload: naver }) => {
// //       state.naver = naver;
// //     },
// //     logoutSuccess: (state) => {
// //       state.naver = null;
// //       localStorage.removeItem('naver');
// //     },
// //   },
// // });

// // export const { loginSuccess, logoutSuccess } = naverSlice.actions;

// // export const selectNaver = (state) => state.naver.naver;

// // export default naverSlice.reducer;  