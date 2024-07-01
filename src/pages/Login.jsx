import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../features/member/memberSlice";

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

const RegisterGround = styled.div`
  height: 64px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 52px;
  text-align: center;

  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  flex: none;
  order: 0;
  flex-grow: 0;
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

const CheckStyle = styled.div`
  margin: 0 auto;
  /* width: 50px; */
  /* height: 29px; */
  border-style: none;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;

  color: #007aff;

  /* flex: none; */
  order: 1;
  flex-grow: 0;
  z-index: 1;
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

const CommonBtn = styled.button`
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
  }
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
        `http://localhost:8080/login?id=${formData.memId}&pw=${formData.memPwd}`);
        console.log(result);

      // if (result.data) {
        // 로그인 성공 시 서버가 내려준 토큰(JWT)와 사용자 정보
        const { token, member } = result.data;  

        // 전역 상태에 사용자 정보 저장
        dispatch(
          loginSuccess({
            id: formData.memId,
            pwd: formData.memPwd,
            email: formData.memEmail,
            name: formData.memName,
            nickname: formData.memNick,
            grade: formData.memGrade,
            role: formData.memRole,
            point: formData.memPoint
          })
        );

        // 발급 받은 토큰 저장
        localStorage.setItem('token', token);
        localStorage.setItem('information', member);

        // 로그인 후 페이지 이동
        navigate("/");
        alert('로그인');
    } catch (error) {
      console.log(error);
      alert("아이디 또는 비밀번호가 잘못 입력되었습니다.");
    }
  };

  return (
    <LoginContainer>
      <Autolayout>
        <RegisterGround>Login</RegisterGround>
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
                autoComplete= "off"
                value={formData.memPwd}
                onChange={handleChange}
              />
            </Autobox>

            <>
              <CommonBtn type="submit">Login</CommonBtn>
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
