import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
  /* width: 100%; */
  max-width: 1440px;
  margin: 0 auto;
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

  width: 819px;
  height: 830px;

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
  margin: 0 auto;
  
  position: absolute;
  width: 606px;
  height: 685px;

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

  width: 606px;
  height: 480px;

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
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  width: 559px;
  height: 29px;

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

  width: 490px;
  height: 29px;

  /* flex: none; */
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

const CheckBtn = styled.button`
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
    background:  #5FB393;
    color: black;
    transition: 0.7s;
  }
`;

function FindPwd() {
  const navigator = useNavigate();
  const [memId, setMemId] = useState('');
  const [memName, setMemName] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [error, setError] = useState('');

  const handleFind = async () => {
    if (!memId || !memName || !memEmail) {
      alert('아이디, 이름, 이메일을 전부 입력 해주세요.');
      return;
    }

    // console.log("http://localhost:8080/find-password", { memId, memName, memEmail });
    try {
      const response = await axios.post("http://localhost:8080/find/pwd", { memId, memName, memEmail });
      // console.log(response);
      setError('이메일로 임시 비밀번호를 보냈습니다.');
    } catch (error) {
      console.error('Error fetching password:', error);
      setError('사용자를 찾을 수 없습니다.');
    }
  };

  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>Find Password</RegisterGround>
          <RegisterWhite>
            <Sublayout>
              <Autobox>
                  <CommonInfo>
                    <>Id</>
                    </CommonInfo>
                  <CommonInput  value={memId} onChange={(e) => setMemId(e.target.value)} />
              </Autobox>

              <Autobox>
                  <CommonInfo>
                    <>Name</>
                    </CommonInfo>
                  <CommonInput  value={memName} onChange={(e) => setMemName(e.target.value)} />
              </Autobox>

              <Autobox>
                  <CommonInfo>
                    <InfoStyle>Email</InfoStyle>
                  </CommonInfo>
                  <CommonInput value={memEmail} onChange={(e) => setMemEmail(e.target.value)} />
              </Autobox>

              <>
                <CheckBtn onClick={handleFind}>Check</CheckBtn>
              </>  
              {/* {<div>'이메일로 임시 비밀번호를 보냈습니다.'</div>} */}
              {error && <div>{error}</div>} 
            </Sublayout>
          </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default FindPwd;
