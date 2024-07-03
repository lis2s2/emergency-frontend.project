import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../features/member/memberSlice";
import kakaoBtn from "../images/kakao_login_large_wide.png";
import naverBtn from "../images/btnW_완성형.png";

const LoginContainer = styled.div`
  /* width: 100%; */
  max-width: 1440px;
  background-color: #5fb393;
  min-height: 820px;
`;

const Autolayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;
  margin: 0 atuo;

  width: 819px;
  height: 830px;
  left: 310px;
  top: 0px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const Sublayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 24px;
  margin: 0 auto;
  /* padding-left: 20px; */

  position: absolute;
  width: 606px;
  height: 548px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;


const RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  isolation: isolate;

  width: 606px;
  height: 548px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Autobox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #111111;

  /* width: 606px; */
  height: 82px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const CommonInfo = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  padding: 0px;

  width: 559px;
  height: 29px;

  /* margin: 0 auto;
  width: 22px;
  height: 29px; */

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const InfoStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 400px;
  height: 29px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const CommonInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  font-size: 16px;

  width: 100%;
  height: 45px;

  background: #ffffff;
  border: 1px solid rgba(145, 145, 145, 0.5);
  border-radius: 8px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const LoginBtn = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 558px;
  height: 45px;

  background: #5fb393;
  border: none;
  border-radius: 8px;

  flex: none;
  order: 5;
  align-self: stretch;
  flex-grow: 0;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #ffffff;

  &:hover {
    background: #5fb393;
    color: black;
    transition: 0.7s;
    /* border: none; */
  }
`;

const KakaoBtn = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 558px;
  height: 45px;

  border: none;
  border-radius: 8px;

  flex: none;
  order: 5;
  align-self: stretch;
  flex-grow: 0;

  background: url(${kakaoBtn});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  color: #ffffff;
`;

const NaverBtn = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 558px;
  height: 45px;

  border: none;
  border-radius: 8px;

  flex: none;
  order: 5;
  align-self: stretch;
  flex-grow: 0;

  background: url(${naverBtn});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  color: #ffffff;
`;

const Textbtn = styled.button`
  width: 558px;
  height: 20px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  background-color: white;
  border: none;

  color: darkolivegreen;

  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
`;

const REST_API_KEY_K = '6725e27a1c1047905dfd6bad61521355';
const REDIRECT_URI_K = 'http://localhost:3000/login/oauth2/code/kakao';

const REST_API_KEY_N = 'QiZW7Xq40T2iOCfUC6EH';
const REDIRECT_URI_N = 'http://localhost:3000/login/oauth2/code/naver';
const CLIENT_SECRET_N = 'vEffUzBSSt';

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

    // console.log(formData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.memId || !formData.memPwd) {
      alert("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    // axios.get(`http://localhost:8080/login?id=${formData.memId}&pw=${formData.memPwd}`)
    //   .then(response => {
    //     if (response.data) {

    //       dispatch(loginSuccess({ name: formData.memId, nick: formData.memNick, role: formData.memRole }));

    //       localStorage.setItem('token', response.data);

    //       alert('로그인');
    //       Navigate('/');
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert('아이디 또는 비밀번호가 잘못 입력되었습니다.');
    //   });
    // }

    try {
      const result = await axios.get(
        `http://localhost:8080/login?id=${formData.memId}&pw=${formData.memPwd}`
        // `'http://localhost:8080/login', formData`
      );
      console.log(result);
      // const { data } = result;

      // 로그인 성공 시 서버가 내려준 토큰(JWT)와 사용자 정보
      const { token, member } = result.data;
      // const token = result.headers.authorization;
      // const member = data;

      // 전역 상태에 사용자 정보 저장
      dispatch(loginSuccess(member));

        // 발급 받은 토큰 저장
        localStorage.setItem('token', token);
        // 로그인 상태를 유지하기 위해 로컬 스토리지 사용
        localStorage.setItem('member', JSON.stringify(member));

      navigate("/");
      alert("로그인 하셨습니다.");
    } catch (error) {
      console.log(error);
      alert("아이디 또는 비밀번호가 잘못 입력되었습니다.");
    }
  };

  // 카카오톡 로그인
  const kakaolink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_K}&redirect_uri=${REDIRECT_URI_K}&response_type=code`;
  const kakaoLoginHandler = () => {
    window.location.href = kakaolink;
  };

  // 네이버 로그인
  const naverlink = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY_N}&response_type=code&redirect_uri=${REDIRECT_URI_N}&state=${CLIENT_SECRET_N}`;
  const naverLoginHandler = () => {
    window.location.href = naverlink;
  };

  // useEffect(() => {
  //   axios.post( `http://localhost:8080/login`)
  //   .then(result => result.data);
  //   navigate("/");
  // }, []);

  return (
    <LoginContainer>
      <Autolayout>
        <RegisterWhite>
          <Sublayout onSubmit={handleLogin}>
            <Autobox>
              <CommonInfo>
                <InfoStyle>ID</InfoStyle>
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
                {/* <CheckStyle>Forgot password?</CheckStyle> */}
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
              <LoginBtn type="submit">Login</LoginBtn>
              <KakaoBtn type="button" onClick={kakaoLoginHandler} />
              <NaverBtn type="button" onClick={naverLoginHandler} />
              <Textbtn onClick={() => navigate("/search")}>
                Forgot password?
                {/* <span>Search for passwords</span> */}
              </Textbtn>
              <Textbtn onClick={() => navigate("/register")}>
                Don’t have account?
                {/* <span color="red">Create new account</span> */}
              </Textbtn>
            </>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </LoginContainer>
  );
}

export default Login;
