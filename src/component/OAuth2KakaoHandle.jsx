import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess} from "../features/member/memberSlice";

function OAuth2KakaoHandle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);  
  const code = searchParams.get("code");

  useEffect(() => { 
    const fetchToken = async () => {
      const TOKEN_URL = `${process.env.REACT_APP_API_URL}/api/proxy/kakao-token`;
      
      try {
        const tokenResponse = await axios.post(TOKEN_URL, null, {
          params: { code },
        });

        const { access_token } =  tokenResponse.data;
        const authorization = `Bearer ${access_token}`;
      
        const userResponse = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
          headers: { Authorization: authorization },
        });
        
        const userInfo = userResponse.data;
        const userInfoDetails = userResponse.data.kakao_account;
        
        const memberData = {
          memId: 'k_' + userInfo.id,
          memPwd: 'default_password', // 기본 비밀번호 설정
          memName: userInfoDetails.profile.nickname,
          memEmail: userInfoDetails.email,
          memGrade: 'FAMILY',
          memRole: 'ROLE_USER',
          memPoint: 0,
          provider: 'kakao'
        };
        
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

    fetchToken(code);
  }, [code, navigate, dispatch]);

  return null;
}

export default OAuth2KakaoHandle;