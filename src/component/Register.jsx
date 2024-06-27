import styled from "styled-components";

const RegisterContainer = styled.div`
  /* width: 100%; */
  max-width: 1440px;
  margin: 0 auto;
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
  /* margin: 0 atuo; */

  /* position: absolute; */
  width: 819px;
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
  padding: 0px;
  /* padding-top: 200px; */
  /* padding-right: 200px; */
  gap: 24px;
  margin: 0 auto;
  
  position: relative;
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

const  RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  isolation: isolate;

  width: 606px;
  height: 685px;

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

  /* flex: 1; */
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

  flex: none;
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
  border: 1px solid #000000;
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

function Register() {
  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>Register</RegisterGround>
          <RegisterWhite>
            <Sublayout>
              <Autobox>
                <CommonInfo>
                  <InfoStyle>ID</InfoStyle>
                  <CheckStyle>중복체크</CheckStyle>
                </CommonInfo>
                <CommonInput />
              </Autobox>

              <Autobox>
                <CommonInfo>
                  <InfoStyle>Password</InfoStyle>
                  <CheckStyle>영문, 숫자 포함 8~15자리로 입력해주세요.</CheckStyle>
                </CommonInfo>
                <CommonInput />
              </Autobox>
              
              <Autobox>
                <CommonInfo>
                  <>Name</>
                </CommonInfo>
                <CommonInput />
              </Autobox>

              <Autobox>
                <CommonInfo>
                  <InfoStyle>Email</InfoStyle>
                  <CheckStyle>중복체크</CheckStyle>
                </CommonInfo>
                <CommonInput />
              </Autobox>

              <Autobox>
                <CommonInfo>
                  <>Nick-Name</>
                </CommonInfo>
                <CommonInput />
              </Autobox>
              
              <>
                <CommonBtn>Sign Up</CommonBtn>
                <CommonBtn>Login Page</CommonBtn>
              </>
            </Sublayout>
          </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
};

export default Register;