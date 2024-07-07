// import axios from "axios";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { loginSuccess } from "../features/member/memberSlice";

// const REST_API_KEY_K = '6725e27a1c1047905dfd6bad61521355';
// const REDIRECT_URI_K = 'http://localhost:3000/login/oauth2/code/kakao';

// const REST_API_KEY_N = 'QiZW7Xq40T2iOCfUC6EH';
// const REDIRECT_URI_N = 'http://localhost:3000/login/oauth2/code/naver';
// const CLIENT_SECRET_N = 'vEffUzBSSt';

// function OAuth2RedirectHandler() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => { 
//     const searchParams = new URLSearchParams(location.search);
//     const code = searchParams.get("code");
//     const state = searchParams.get("state");

//     console.log(code);
//     //   const tokenParams = {
//     //   client_id: REST_API_KEY_N,
//     //   client_secret: CLIENT_SECRET_N,
//     //   code: token,
//     //   grant_type : 'authorization_code',
//     //   state: CLIENT_SECRET_N,
//     // }
//     axios.post( `https://nid.naver.com/oauth2.0/token?code=${code}&state=${CLIENT_SECRET_N}&grant_type=authorization_code&client_id=${REST_API_KEY_N}&client_secret=${CLIENT_SECRET_N}`)
//     // axios.post('https://nid.naver.com/oauth2.0/token?' + tokenParams)
//     .then(response => {
//       // this.token.access_token = response.data.result.access_token;
//       // this.token.refresh_token = response.data.result.refresh_token;
//       const { token, member } = response.data;
//       dispatch(loginSuccess(member));
//       localStorage.setItem("token", token);
//       localStorage.setItem("member", JSON.stringify(member));

//       // navigate("/");
//       console.log(token, member);
//       alert("^^");
//     })
//     .catch(error => {
//       alert('실패');
//       console.log(error);
//     })
//   }, []);
//   // 조건문으로 naver일 때랑 kakao일 때 구분해서 코드 적기
//   // 로직 다시 짜야함

//   // 1.
//   // const location = useLocation();
//   // const navigate = useNavigate();
//   // const kakaolink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_K}&redirect_uri=${REDIRECT_URI_K}&response_type=code`;
//   // const dispatch = useDispatch();
//   // const naverLoginHandler = async (code)  => {  
    
//   // const naverlink = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY_N}&response_type=code&redirect_uri=${REDIRECT_URI_N}&state=${CLIENT_SECRET_N}`;
//   // const token = new URL(naverlink).searchParams.get("code");
//   // console.log(token);

//   //   try {
//   //     const result = await axios.post(
//   //       // `https://nid.naver.com/oauth2.0/token?code=${token}&state=${CLIENT_SECRET_N}&grant_type=authorization_code&client_id=${REST_API_KEY_N}&client_secret=${CLIENT_SECRET_N}`
//   //       `https://kauth.kakao.com/oauth/token?code=${token}&state=${CLIENT_SECRET_N}&grant_type=authorization_code&client_id=${REST_API_KEY_N}&client_secret=${CLIENT_SECRET_N}`
//   //     );
//   //     console.log(result);

//   //     // 로그인 성공 시 서버가 내려준 토큰(JWT)와 사용자 정보
//   //     const { access_token } = result.data
//   //     // const { token, member } = result.data;

//   //     // 전역 상태에 사용자 정보 저장
//   //     // dispatch(loginSuccess(member));

//   //       // 발급 받은 토큰 저장
//   //       localStorage.setItem('token', access_token);
//   //       // 로그인 상태를 유지하기 위해 로컬 스토리지 사용
//   //       // localStorage.setItem('member', JSON.stringify(member));

//   //     navigate("/");
//   //     alert("로그인 하셨습니다.");
//   //   } catch (error) {
//   //     console.log(error);
//   //     alert("아이디 또는 비밀번호가 잘못 입력되었습니다.");
//   //   }
//   // };

//   // naverLoginHandler();

//   // 2.
//   // const token = new URL(kakaolink).searchParams.get("code");
//   // const kakaoRes = axios.post("https://kauth.kakao.com/oauth/token",
//   // const tokenParams = {
//   //   client_id: REST_API_KEY_N,
//   //   client_secret: CLIENT_SECRET_N,
//   //   code: REDIRECT_URI_N.get("code"),
//   //   grant_type : 'authorization_code',
//   //   state: this.generateEncodedState(),
//   // }

//   // const getkakaoToken = async (code) => {
//   //   const token = new URL(naverlink).searchParams.get("code");
//   //   const tokenParams = {
//   //     client_id: REST_API_KEY_N,
//   //     client_secret: CLIENT_SECRET_N,
//   //     code: code,
//   //     grant_type : 'authorization_code',
//   //     state: this.generateEncodedState(),
//   //   }

//   //   await axios.post('https://nid.naver.com/oauth2.0/token' + token)
//   //     .then(response => {
//   //       this.token.access_token = response.data.result.access_token;
//   //       this.token.refresh_token = response.data.result.refresh_token;
//   //       alert('성공');
//   //       console.log(response, token);
//   //     })
//   //     .catch(error => {
//   //       alert('실패');
//   //       console.log(error);
//   //     })
//   // }
// // }

// // 3.
// // useEffect(() => {
// //   const fetchKakaoToken = async (code) => {
// //     try {
// //       const response = await axios.post(
// //         'https://kauth.kakao.com/oauth/token',
// //         null,
// //         {
// //           params: {
// //             grant_type: 'authorization_code',
// //             client_id: REST_API_KEY_K,
// //             redirect_uri: REDIRECT_URI_K,
// //             code,
// //           },
// //           headers: {
// //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
// //           },
// //         }
// //       );

// //       const { access_token } = response.data;
// //       // 저장된 토큰을 사용하여 사용자 정보를 요청할 수 있습니다.
// //       localStorage.setItem('token', access_token);
// //       alert('로그인 성공');
// //       navigate("/");
// //     } catch (error) {
// //       console.error('인증 실패', error);
// //       alert('인증에 실패했습니다.');
// //       navigate("/login");
// //     }
// //   };

// // 4.
// //   const query = new URLSearchParams(location.search);
// //   const code = query.get("code");

// //   if (code) {
// //     fetchKakaoToken(code);
// //   } else {
// //     alert("인증 코드가 없습니다.");
// //     navigate("/login");
// //   }
// // }, [location, navigate]);

// // return null;
// // }

// // 5.
// //   useEffect(() => {
// //     const query = new URLSearchParams(location.search);
// //     const code = query.get("code");

// //     if (code) {
// //       // 여기에 백엔드 서버로 인증 코드를 보내는 로직을 추가하세요.
// //       axios
// //         .post("http://localhost:8080/login/oauth2/code/kakao", { code })
// //         .then((response) => {
// //           // 인증이 성공하면 토큰을 저장하고 원하는 페이지로 리디렉션합니다.
// //           localStorage.setItem("token", response.data.token);
// //           alert("로그인 성공");
// //           navigate("/");
// //         })
// //         .catch((error) => {
// //           console.error("인증 실패", error);
// //           alert("인증에 실패했습니다.");
// //           navigate("/login");
// //         });
// //     } 
// //     else {
// //       alert("인증 코드가 없습니다.");
// //       navigate("/login");
// //     }
// //   }, [location, navigate]);
// }

// export default OAuth2RedirectHandler;