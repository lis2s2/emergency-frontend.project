import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  min-height: 820px;
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
  };
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
  height: 645px;
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

const CheckStyle = styled.div`
  margin: 0 auto;
  border-style: none;
  border-radius: 8px;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;
  color: #007aff;
  white-space: nowrap;
`;

const CheckBtn = styled.button`
  box-sizing: border-box;
  margin: 0 auto;
  border-style: none;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;
  color: #ff0015;
  white-space: nowrap;
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

const CommonBtn = styled.button`
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
  flex: none;
  order: 5;
  align-self: stretch;
  font-weight: 900;
  font-size: 20px;
  color: #ffffff;
  &:hover {
    background:  #5FB393;
    color: black;
    transition: 0.7s;
  }
`;

function Register() {
  const [stateId, setStateid] = useState(false);
  const [stateEmail, setStateEmail] = useState(false);

  const [formData, setFormData] = useState({
    memId: "",
    memPwd: "",
    memName: "",
    memEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIdCheck = async () => {
    if (!formData.memId) {
      alert('아이디를 입력하세요.');
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/register/checkid?name=${formData.memId}`
      );
      if (!response.data) {
        setStateid(false);
        alert("이미 존재하는 아이디입니다.");
      } else {
        setStateid(true);
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("아이디 중복 체크 실패!", error);
    }
  };

  const handleEmailCheck = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/register/checkemail?name=${formData.memEmail}`
      );
      const emailPattern = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
      if (!emailPattern.test(formData.memEmail)) {
        alert("이메일 형식이 아닙니다.");
        return;
      }
      if (!response.data) {
        setStateEmail(false);
        alert("이미 존재하는 이메일입니다.");
      } else {
        setStateEmail(true);
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복 체크 실패!", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pwdPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,15}$/;

    if (!pwdPattern.test(formData.memPwd)) {
      alert("비밀번호는 소문자와 숫자를 포함한 6~15자리로 입력해주세요.");
      return;
    }

    if (
      !formData.memId ||
      !formData.memPwd ||
      !formData.memName ||
      !formData.memEmail
    ) {
      alert("빈칸이 존재합니다.");
      return;
    }
    if (!stateId) {
      alert('아이디 중복체크를 하세요.');
      return;
    }
    if (!stateEmail) {
      alert('이메일 중복체크를 하세요.');
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, formData)
      .then((response) => {
        if (stateId === true && stateEmail === true) {
          console.log(stateId);
          alert("회원가입을 성공하였습니다.");
          navigate("/login");
        } else if (stateId === false || stateEmail === false) {
          alert("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("회원가입 실패!", error);
        alert("회원가입을 실패하였습니다.");
      });
  };

  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterWhite>
          <Sublayout onSubmit={handleSubmit}>
            <Autobox>
              <CommonInfo>
                <InfoStyle>ID</InfoStyle>
                <CheckBtn type="button" onClick={handleIdCheck}>
                  중복체크
                </CheckBtn>
              </CommonInfo>
              <CommonInput
                type="text"
                name="memId"
                value={formData.memId}
                onChange={handleChange}
                disabled={stateId}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <InfoStyle>Password</InfoStyle>
                <CheckStyle>소문자+숫자 6~15자리</CheckStyle>
              </CommonInfo>
              <CommonInput
                type="password"
                name="memPwd"
                value={formData.memPwd}
                onChange={handleChange}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <InfoStyle>Name</InfoStyle>
              </CommonInfo>
              <CommonInput
                type="text"
                name="memName"
                value={formData.memName}
                onChange={handleChange}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <InfoStyle>Email</InfoStyle>
                <CheckBtn type="button" onClick={handleEmailCheck}>
                  중복체크
                </CheckBtn>
              </CommonInfo>
              <CommonInput
                type="text"
                placeholder="example@example.com"
                name="memEmail"
                value={formData.memEmail}
                onChange={handleChange}
                disabled={stateEmail}
              />
            </Autobox>
            <>
              <CommonBtn type="submit" onClick={handleSubmit}>
                Sign Up
              </CommonBtn>
              <CommonBtn type="button" onClick={() => navigate("/login")}>
                Login Page
              </CommonBtn>
            </>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default Register;
