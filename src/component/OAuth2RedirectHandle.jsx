import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess, selectMember } from "../features/member/memberSlice";

const REST_API_KEY_K = '6725e27a1c1047905dfd6bad61521355';
const REDIRECT_URI_K = 'http://localhost:3000/login/oauth2/code/kakao';

const REST_API_KEY_N = 'QiZW7Xq40T2iOCfUC6EH';
const REDIRECT_URI_N = 'http://localhost:3000/login/oauth2/code/naver';
const CLIENT_SECRET_N = 'nImi9vDd6q';

function OAuth2RedirectHandler() {
  const dispatch = useDispatch();
  const member = useSelector(selectMember);
  const location = useLocation();
  const naverlink = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY_N}&response_type=code&redirect_uri=${REDIRECT_URI_N}&state=${CLIENT_SECRET_N}`;
  const searchParams = new URLSearchParams(location.search);  
  const code = searchParams.get("code");
  const state = searchParams.get("state");

//   const fetchToken = async (code, state) => {
//     try {
//       const result = await axios.post(`http://localhost:8080/api/proxy/naver-token`, null, {
//         params: { code, state },
//       });
      
//       console.log("최종 응답: ", result.data);
//       console.log("액세스 토큰 - ", result.data.access_token);
//       console.log("리프레쉬 토큰 - ", result.data.refresh_token);
//       console.log("토큰만료(초) - ", result.data.expires_in);
//     } catch (error) {
//       console.error("Error fetching the token: ", error);
//     }
//   };
  
//   // 예시로 다음과 같은 식으로 사용 가능
//   fetchToken(code, state);

  useEffect(() => { 
    const fetchToken = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      console.log(code);
      console.log(state);
      
      const TOKEN_URL = `http://localhost:8080/api/proxy/naver-token`;
      
      try {
        const result = await axios.post(TOKEN_URL, null, {
            params: { code, state },
        });
        
        console.log("최종 응답: ", result.data);
        console.log("access_token - ", result.data.access_token);
        console.log("refresh_token - ", result.data.refresh_token);
        console.log("토큰만료(초) - ", result.data.expires_in);
        
        // 추가적인 작업이 필요한 경우 여기에 작성

      const { access_token } = result.data;
      dispatch(loginSuccess(member));   
      localStorage.setItem("token", access_token);
    //   localStorage.setItem("member", JSON.stringify(member));

      } catch (error) {
          console.error("Error fetching the token: ", error);
      }
    };

    fetchToken(code, state);
  }, []);

  return null;
}

export default OAuth2RedirectHandler;