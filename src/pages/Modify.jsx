import styled from "styled-components";
import profileImg from "../images/profile.png";
import { selectMember } from "../features/member/memberSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import axios from "axios";

const RegisterContainer = styled.div`
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
  padding-right: 600px;
  gap: 24px;
  margin: 0 auto;

  position: relative;
  width: 1150px;
  height: 830px;
  left: 310px;
  top: 0px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const Sublayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 24px;

  position: absolute;
  width: 850px;
  height: 644px;

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

  width: 850px;
  height: 644px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const NameCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 12px 12px 20px;
  gap: 12px;
  isolation: isolate;

  position: absolute;
  width: 550px;
  height: 88px;
  top: 61px;

  background: rgba(148, 210, 187, 0.29);
  border: 2px solid #5fb393;
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;

  box-sizing: border-box;
`;

const CardImg = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 38px;
  top: 13px;
  vertical-align: middle;

  background: url(${profileImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const CardId = styled.div`
  position: absolute;
  width: 200px;
  height: 64px;
  top: 13px;
  margin-left: 110px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 26px;
  display: flex;
  align-items: center;

  color: #3d405b;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

const CardGrade = styled.div`
  position: absolute;
  width: 34px;
  height: 29px;
  top: 29px;
  margin-left: 410px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #f4be00;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const CardPoint = styled.div`
  position: absolute;
  width: 63px;
  height: 29px;
  top: 30px;
  margin-left: 320px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #000000;

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

const EditIcons = styled.button`
  position: absolute;
  width: 45px;
  height: 45px;
  left: 565px;
  top: 174px;

  border-style: none;
  background-color: white;
  font-size: 35px;
  vertical-align: middle;
  line-height: 20px;

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

const CancelIcons = styled.button`
  position: absolute;
  width: 45px;
  height: 45px;
  left: 620px;
  top: 174px;

  border-style: none;
  background-color: white;
  font-size: 40px;
  vertical-align: middle;
  line-height: 20px;

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

const Favorites = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  gap: 15px;
  isolation: isolate;

  position: absolute;
  width: 501px;
  height: 350px;
  left: 174px;
  top: 234px;

  background: #ffffff;
  border: 2px solid #5fb393;
  border-radius: 8px;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const FavTitle = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  flex: none;
`;

const CommonInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 0 auto;
  font-size: 16px;

  width: 70%;
  height: 45px;

  background: #ffffff;
  border: 1px solid rgba(145, 145, 145, 0.5);
  border-radius: 8px;

  flex: none;
  align-self: stretch;
`;

function Modify() {
  //   const {memId} = props;
  // // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const member = useSelector(selectMember);
  // const [editValue, setEditValue] = useState('');
  // const [edit, setEdit] = useState(null);

  // const handleEditChange = (e) => {
  //   setEditValue(e.target.value);
  //   console.log(e.target.value);
  //   // setEditValue(memId);
  // };
  
//   const handleEditSave = (id) => {
//     setTodo(todo.map((t) => (t.id === id ? { ...t, contents: editValue } : t)));
//     setEdit(null);
//     setEditValue('');
//   };
  
//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (value.length <= 50) {
//       setInputValue(value);
//     }
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // addTodo 함수에 값이 inputValue 
//     addTodo(inputValue);
    
//     // 다시 빈값으로 만들어줌
//     setInputValue('');
//   };
// const { memId } = props;
const navigate = useNavigate();
const member = useSelector(selectMember);
const [id, setId] = useState(member.memId);
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
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
          // setEmail(JSON.stringify(response.email));

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
        {/* <RegisterGround>My Page</RegisterGround> */}
        <RegisterWhite>
          <Sublayout>
            <NameCard>
              <CardImg />
              <CardId>{member?.memId}</CardId>
              <CardPoint>{member?.memPoint}P</CardPoint>
              <CardGrade>{member?.memGrade}</CardGrade>
            </NameCard>

            <div>
              <EditIcons onClick={() => navigate("/mypage")}>
                <FaCheckCircle onClick={handleEdit} />
              </EditIcons>
              <CancelIcons onClick={() => navigate("/mypage")}>
                <MdCancel onClick={handleCancel} />
              </CancelIcons>
            </div>

            <Favorites>
              <FavTitle>이메일 변경</FavTitle>
              <CommonInput  type="email" value={email} onChange={handleEmailChange}></CommonInput>
              <FavTitle>비밀번호 변경</FavTitle>
              <CommonInput type="password" value={password} onChange={handlePasswordChange}></CommonInput>
              {/* <h2>새 비밀번호</h2>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        /> */}
            </Favorites>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default Modify;
