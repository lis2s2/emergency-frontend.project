import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/member/memberSlice";


function OAuth2NavertHandle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);  
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => { 
    const fetchToken = async () => {
      const TOKEN_URL = `${process.env.REACT_APP_API_URL}/api/proxy/naver-token`;
      
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
      
        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/proxy/naver-user`, {
          headers: { Authorization: authorization },
        });

        // 리다이렉트 하고 싶다!
        // 회원 존재 여부 확인
        // const checkMemberResponse = await axios.get(`http://localhost:8080/check-member/${userInfo.id}`);
        // const memberExists = checkMemberResponse.data;
        // if (!memberExists) {
        //   // 회원 정보가 없는 경우, 소셜 동의 화면으로 리다이렉트
        //   window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY_N}&response_type=code&redirect_uri=${REDIRECT_URI_N}&state=${CLIENT_SECRET_N}`;
        //   return;
        // }

        const userInfo = userResponse.data.response;
        const memberData = {
          memId: 'n_' + userInfo.id.slice(3,10),
          memPwd: 'default_password', // 기본 비밀번호 설정
          memName: userInfo.name,
          memEmail: userInfo.email,
          memGrade: 'FAMILY',
          memRole: 'ROLE_USER',
          memPoint: 0
        };

        console.log("사용자 정보: ", userResponse.data);
        const reponse = await axios.post(`${process.env.REACT_APP_API_URL}/register`, memberData);

        if (reponse.data === false) {
          const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/login?id=${memberData.memId}&pw=${memberData.memPwd}`
          );
          const { token, member } = result.data;
          dispatch(loginSuccess(member));
          localStorage.setItem("token", token);
          localStorage.setItem("member", JSON.stringify(member));
        } else {
          const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/login?id=${memberData.memId}&pw=${memberData.memPwd}`
          );
          const { token, member } = result.data;
          dispatch(loginSuccess(member));
          localStorage.setItem("token", token);
          localStorage.setItem("member", JSON.stringify(member));
        }

        navigate('/');
      } catch (error) {
          console.error("Error fetching the token: ", error);
      }
    };

    fetchToken(code, state);
  }, [code, navigate, dispatch, state]);

  return null;
}

export default OAuth2NavertHandle;