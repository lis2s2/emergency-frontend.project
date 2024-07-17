import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const RegisterContainer = styled.div`
  width: 100%;
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
  margin: 0 auto;
  gap: 24px;
  width: 819px;
  height: 830px;

  @media screen and (max-width: 767px) {
    max-width: 400px;
  }
`;

const Sublayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  height: 440px;
`;

const RegisterGround = styled.div`
  height: 64px;

  font-weight: 900;
  font-size: 36px;
  line-height: 52px;
  text-align: center;

  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  width: 605px;
  height: 440px;
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
  padding: 0px;
  gap: 8px;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;
  color: #111111;
  width: 100%;
  height: 82px;
`;

const CommonInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  width: 100%;
  height: 28px;
  box-sizing: border-box;
`;

const InfoStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 490px;
  height: 29px;
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

function FindId() {

  const [memId, setMemId] = useState('');
  const [memName, setMemName] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [error, setError] = useState('');

  const handleFind = async () => {
    if (!memName || !memEmail) {
      alert('이름, 이메일을 전부 입력 해주세요.');
      return;
    }
    console.log("http://localhost:8080/find", { memName, memEmail });
    try {
      const response = await axios.post("http://localhost:8080/find/id", { memName, memEmail });
      setMemId(response.data.memId);
      setError('아이디는 "' + response.data + '" 입니다');

    } catch (error) {
      console.error('Error fetching password:', error);
      setMemId('');
      setError('사용자를 찾을 수 없습니다.');
    }
  };

  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>Find Id</RegisterGround>
          <RegisterWhite>
            <Sublayout>
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
                <CommonBtn onClick={handleFind}>Check</CommonBtn>
              </>  
              {setMemId && <div>{memId}</div>}
              {error && <div>{error}</div>} 
            </Sublayout>
          </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default FindId;
