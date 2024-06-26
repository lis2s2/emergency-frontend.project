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
  padding: 0px;
  gap: 24px;

  position: absolute;
  width: 819px;
  height: 830px;
  left: 310px;
  top: 0px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const RegisterGround = styled.div`
  padding-bottom: 450px;
  padding-right: 150px;
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

  width: 490px;
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

  width: 558px;
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
  border: 1px solid #000000;
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
`;

function Search() {
  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>Searching for passwords
            <RegisterWhite>
            <Autobox>
                <CommonInfo>
                <InfoStyle>ID</InfoStyle>
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
                </CommonInfo>
                <CommonInput />
            </Autobox>

            <>
                <CommonBtn>Check</CommonBtn>
            </>   
            </RegisterWhite>
        </RegisterGround>
      </Autolayout>
    </RegisterContainer>
  );
}

export default Search;
