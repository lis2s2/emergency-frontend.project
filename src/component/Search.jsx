import axios from "axios";
import { useState } from "react";
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
  //left: 310px;
  //top: 0px;

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
  /* padding-top: 200px; */
  /* padding-right: 200px; */
  gap: 24px;
  margin: 0 auto;
  /* padding-left: 20px; */
  
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
  height: 568px;

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

  width: 558px;/
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
    background:  #5FB393;
    color: black;
    transition: 0.7s;
  }
`;

function Search() {

  const [memId, setMemId] = useState('');
  const [memName, setMemName] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [memPwd, setMemPwd] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!memId || !memName || !memEmail) {
      setError('아이디, 이름, 이메일은 필수 입력 사항입니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/search', { memId, memName, memEmail });
      setMemPwd(response.data.memPwd);
      setError('');
    } catch (error) {
      console.error('Error fetching password:', error);
      setMemPwd('');
      setError('사용자를 찾을 수 없습니다.');
    }
  };

  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>Searching for passwords</RegisterGround>
          <RegisterWhite>
            <Sublayout>
              <Autobox>
                  <CommonInfo>
                    <InfoStyle>ID</InfoStyle>
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
                <CommonBtn onClick={handleSearch}>Check</CommonBtn>
              </>  
              {memPwd && <div>비밀번호: {memPwd}</div>}
              {error && <div>{error}</div>} 
            </Sublayout>
          </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default Search;
