import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";


const LoginContainer = styled.div`
  /* width: 100%; */
  max-width: 1440px;
  background-color: #5FB393;
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
  padding: 0px;
  /* padding-top: 200px; */
  /* padding-right: 200px; */
  gap: 24px;
  margin: 0 auto;
  
  position: relative;
  width: 606px;
  height: 548px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const RegisterGround = styled.div`
  /* padding-bottom: 450px; */
  /* padding-right: 150px; */
  /* margin-bottom: 20px; */
  /* margin: 0 auto; */

  /* width: 187px; */
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

const  RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  isolation: isolate;

  width: 606px;
  height: 548px;

  background: #FFFFFF;
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

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;
  
  color: #111111;

  width: 560px;
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

const CheckStyle = styled.button`
  margin: 0 auto;
  /* width: 50px; */
  /* height: 29px; */
  border-style: none;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;

  color: #007AFF;

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

  width: 558px;
  height: 45px;

  background: #FFFFFF;
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

  background: #5FB393;
  border: none;
  border-radius: 8px;
  

  flex: none;
  order: 5;
  align-self: stretch;
  flex-grow: 0;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #FFFFFF;
`;

const Textbox = styled.div`
  width: 558px;
  height: 20px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #111111;

  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
`;


function Login() {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', formData)
      .then(response => {
        if (response.data) {
          alert('로그인 성공');
          // 로직?
          Navigate('/');

        } else {
          alert('아이디 또는 비밀번호가 존재하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        alert('아이디 또는 비밀번호가 잘못 입력되었습니다.');
      });
  };

  return (
    <LoginContainer>
      <Autolayout>
        <RegisterGround>Login</RegisterGround>
          <RegisterWhite>
            <Sublayout onSubmit={handleSubmit}>
              <Autobox>
                <CommonInfo>
                  <InfoStyle>ID</InfoStyle>
                </CommonInfo>
                <CommonInput type="text" name="memEmail" value={formData.memEmail} onChange={handleChange} />
              </Autobox>

              <Autobox>
                <CommonInfo>
                  <InfoStyle>Password</InfoStyle>
                  <CheckStyle>Forgot password? </CheckStyle>
                </CommonInfo>
                <CommonInput type="password" name="memPwd" value={formData.memPwd} onChange={handleChange} />
              </Autobox>

              <>
                <CommonBtn  type="submit" onClick={handleSubmit}>Login</CommonBtn>
                <Textbox>Don’t have account? Create new account</Textbox>
              </>
            </Sublayout>
          </RegisterWhite>
      </Autolayout>
    </LoginContainer>
  );
};

export default Login;