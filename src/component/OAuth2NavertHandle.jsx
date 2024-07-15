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

function OAuth2NavertHandle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectMember);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);  
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => { 
    const fetchToken = async () => {
      // console.log(code);
      // console.log(state);
      
      const TOKEN_URL = `http://localhost:8080/api/proxy/naver-token`;
      
      try {
        const tokenResponse = await axios.post(TOKEN_URL, null, {
          params: { code, state },
        });
        
        console.log("최종 응답: ", tokenResponse.data);
        console.log("access_token - ", tokenResponse.data.access_token);
        console.log("refresh_token - ", tokenResponse.data.refresh_token);
        console.log("토큰만료(초) - ", tokenResponse.data.expires_in);
        
        const { access_token } =  tokenResponse.data;
        const authorization = `Bearer ${access_token}`;
      
        const userResponse = await axios.get(`http://localhost:8080/api/proxy/naver-user`, {
          headers: { Authorization: authorization },
        });

        // if (member.memId === null) {
        //   // 회원 정보가 없는 경우, 소셜 동의 항목을 다시 요청
        //   window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY_N}&response_type=code&redirect_uri=${REDIRECT_URI_N}&state=${CLIENT_SECRET_N}`;
        //   return;
        // }

        const userInfo = userResponse.data.response;
        const memberData = {
          memId: 'n_' + userInfo.id.slice(3,10),
          memPwd: 'default_password', // 기본 비밀번호 설정
          memName: userInfo.name,
          memEmail: userInfo.email,
          provider: 'naver',
          memGrade: 'FAMILY',
          memRole: 'ROLE_USER',
          memPoint: 0
        };

        // DB에 저장
          await axios.post("http://localhost:8080/register", memberData);

        dispatch(loginSuccess(memberData));
        localStorage.setItem("member", JSON.stringify(userInfo));
        localStorage.setItem("token", access_token);

        navigate('/');
      } catch (error) {
          console.error("Error fetching the token: ", error);
      }
    };

    fetchToken(code, state);
  }, []);
  // }, [code, state, navigate, dispatch]);

  return null;
}

export default OAuth2NavertHandle;