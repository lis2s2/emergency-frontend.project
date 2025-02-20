import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../features/member/memberSlice";
import kakaoBtn from "../images/kakao_btn.png";
import naverBtn from "../images/naver_btn.png";

const LoginContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  min-height: 830px;
`;

const Autolayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin: 0 auto;
  position: relative;
  width: 1150px;
  height: 830px;

  @media screen and (max-width: 767px) {
    max-width: 400px;
  }
`;

const Sublayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 24px;
  width: 100%;
  height: 644px;  
`;

const RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  width: 605px;
  height: 545px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  @media screen and (max-width: 767px) {
    max-width: 440px;
  }
  @media screen and (max-width: 480px) {
    max-width: 360px;
  }
`;

const Autobox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  width: 100%;
  padding: 0px;
  gap: 8px;
  font-weight: 900;
  font-size: 20px; 
  line-height: 29px;
  color: #111111;
  height: 82px;
`;

const CommonInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100%;
  height: 28px;
  box-sizing: border-box;
`;

const InfoStyle = styled.div`
  padding: 0px;
  width: 100%;
  height: 28px;
  box-sizing: border-box;
  text-align: start;
`;

const CommonInput = styled.input`
  box-sizing: border-box;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  height: 45px;
  background: #ffffff;
  border: 1px solid rgba(145, 145, 145, 0.5);
  border-radius: 8px;
`;

const LoginBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: 64px;
  background: #5fb393;
  border: none;
  border-radius: 8px;
  font-weight: 900;
  font-size: 20px;
  color: #ffffff;
  &:hover {
    background: #5fb393;
    color: black;
    transition: 0.7s;
  }
`;

const KakaoBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  border: none;
  background: url(${kakaoBtn}) no-repeat center center;
  flex: 1;
  background-size: contain;
  color: #ffffff;
`;

const NaverBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: url(${naverBtn}) no-repeat center center;
  flex: 1;
  background-size: contain; 
  color: #ffffff;
  padding: 0; 
`;

const Textbtn = styled.button`
  height: 20px;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  background-color: white;
  border: none;
  color: darkolivegreen;
`;

const SocialBtnContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  padding: 0;
`;

const CheckStyle = styled.button`
  padding: 2px 8px;
  border-style: none;
  border-radius: 16px;
  font-weight: 800;
  font-size: 13px;
  line-height: 20px;
  color: #007aff;
  white-space: nowrap;
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memId: "",
    memPwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.memId || !formData.memPwd) {
      alert("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/login?id=${formData.memId}&pw=${formData.memPwd}`
      );

      const { token, member } = result.data;

      dispatch(loginSuccess(member));

      localStorage.setItem("token", token);
      localStorage.setItem("member", JSON.stringify(member));

      navigate("/");
      alert("로그인 하셨습니다.");
    } catch (error) {
      console.log(error);
      alert("아이디 또는 비밀번호가 잘못 입력되었습니다.");
    }
  };

  // 카카오톡 로그인
  const kakaolink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_K}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_K}&response_type=code`;
  const kakaoLoginHandler = () => {
    window.location.href = kakaolink;
  };

  // 네이버 로그인
  const naverlink = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_N}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_N}&state=${process.env.REACT_APP_CLIENT_SECRET_N}`;
  console.log(naverlink);
  const naverLoginHandler = () => {
    window.location.href = naverlink;
  };

  return (
    <LoginContainer>
      <Autolayout>
        <RegisterWhite>
          <Sublayout onSubmit={handleLogin}>
            <Autobox>
              <CommonInfo>
                <InfoStyle>ID</InfoStyle>
                <CheckStyle type="button" onClick={() => navigate("/find/id")}>Forgot Id?</CheckStyle>
              </CommonInfo>
              <CommonInput
                type="text"
                name="memId"
                value={formData.memId}
                onChange={handleChange}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <InfoStyle>Password</InfoStyle>
                <CheckStyle type="button" onClick={() => navigate("/find/pwd")}>Forgot Password?</CheckStyle>
              </CommonInfo>
              <CommonInput
                type="password"
                name="memPwd"
                autoComplete="off"
                value={formData.memPwd}
                onChange={handleChange}
              />
            </Autobox>
            <>
              <Textbtn type="button" onClick={() => navigate("/register")}>
                Don’t have account?
              </Textbtn>
            </>
            <>
              <LoginBtn type="submit">Login</LoginBtn>
              <SocialBtnContainer>
                <KakaoBtn type="button" onClick={kakaoLoginHandler} />
                <NaverBtn type="button" onClick={naverLoginHandler} />
              </SocialBtnContainer>
            </>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </LoginContainer>
  );
}

export default Login;
