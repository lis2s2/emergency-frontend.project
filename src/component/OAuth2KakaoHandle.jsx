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

function OAuth2KakaoHandle() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectMember);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);  
  const code = searchParams.get("code");

  useEffect(() => { 
    const fetchToken = async () => {
      console.log(code);
    
      const TOKEN_URL = `http://localhost:8080/api/proxy/kakao-token`;
      
      try {
        const tokenResponse = await axios.post(TOKEN_URL, null, {
          params: { code},
        });
        
        console.log("최종 응답: ", tokenResponse.data);
        console.log("access_token - ", tokenResponse.data.access_token);
        console.log("refresh_token - ", tokenResponse.data.refresh_token);
        console.log("토큰만료(초) - ", tokenResponse.data.expires_in);
        
        const { access_token } =  tokenResponse.data;
        const authorization = `Bearer ${access_token}`;
      
        const userResponse = await axios.get(`http://localhost:8080/api/proxy/kakao-user`, {
          headers: { Authorization: authorization },
        });
  
        console.log("사용자 정보: ", userResponse.data);

        dispatch(loginSuccess(member));   
        localStorage.setItem("member", JSON.stringify(userResponse.data.response));

        navigate('/');

      } catch (error) {
          console.error("Error fetching the token: ", error);
      }
    };

    fetchToken(code);
  }, []);

  return null;
}

export default OAuth2KakaoHandle;