import styled from "styled-components";
import { selectMember } from "../features/member/memberSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import axios from "axios";

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

const Sublayout = styled.div`
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
  height: 470px;
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

const EditIcons = styled.button`
  width: 45px;
  height: 45px;
  border-style: none;
  background-color: white;
  font-size: 35px;
  vertical-align: middle;
  line-height: 20px;
`;

const CancelIcons = styled.button`
  width: 45px;
  height: 45px;
  border-style: none;
  background-color: white;
  font-size: 40px;
  vertical-align: middle;
  line-height: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;
`;

const Favorites = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 15px;
  background: #ffffff;
  border: 2px solid #5fb393;
  border-radius: 8px;
`;

const ModifyInfo = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;

  
`;

const CommonInput = styled.input`
  box-sizing: border-box;
  padding: 8px;
  text-align: center;
  font-size: 16px;
  width: 90%;
  height: 45px;
  background: #ffffff;
  border: 1px solid rgba(145, 145, 145, 0.5);
  border-radius: 8px;

  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

function Modify() {
const navigate = useNavigate();
const member = useSelector(selectMember);
const id = member?.memId;
const [email, setEmail] = useState(member?.memEmail || "");
const [password, setPassword] = useState("");

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handleEdit = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = { memId: id };

    if (email) data.memEmail = email;
    if (password) data.memPwd = password;

      const response = await axios.put('http://localhost:8080/mypage/modify', data,  {
        headers : {
          'Content-Type': `application/json`,
          'Authorization': `${token}`,
        }
      });
      if (response.status === 200) {
          alert("수정되었습니다!");
          navigate('/mypage');
      } else {
          alert("수정 실패: " + response.data.message);
      }
  } catch (error) {
      console.error('Error occurred while modifying user:', error);
      alert("서버 에러로 수정 실패.");
  }
}

const handleCancel = () => {
  navigate('/mypage');
}

  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterWhite>
          <Sublayout>
            <ButtonContainer>
              <EditIcons onClick={() => navigate("/mypage")}>
                <FaCheckCircle onClick={handleEdit} />
              </EditIcons>
              <CancelIcons onClick={() => navigate("/mypage")}>
                <MdCancel onClick={handleCancel} />
              </CancelIcons>
            </ButtonContainer>
            <Favorites>
              <ModifyInfo>이메일 변경</ModifyInfo>
              <CommonInput  type="email" value={email} onChange={handleEmailChange}></CommonInput>
              <ModifyInfo>비밀번호 변경</ModifyInfo>
              <CommonInput type="password" value={password} onChange={handlePasswordChange}></CommonInput>
            </Favorites>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default Modify;
