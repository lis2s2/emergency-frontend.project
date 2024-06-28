import styled from "styled-components";

const RegisterContainer = styled.div`
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
  /* padding-top: 200px; */
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
  padding: 0px;
  /* padding-top: 200px; */
  /* padding-right: 200px; */
  gap: 24px;

  position: relative;
  width: 850px;
  height: 644px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const RegisterGround = styled.div`
  /* padding-bottom: 550px; */
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

  width: 850px;
  height: 644px;
  /* left: 152px;
  top: 139px; */


  background: #FFFFFF;
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
  padding: 12px 0px 12px 20px;
  gap: 12px;
  isolation: isolate;

  position: absolute;
  width: 600px;
  height: 88px;
  left: 125px;
  top: 61px;

  background: rgba(148, 210, 187, 0.29);
  border: 2px solid #5FB393;
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;

  box-sizing: border-box;
`;

const CardImg = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 38px;
  top: 5px;

  background: url(.png);

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const CardNick = styled.div`
  position: absolute;
  width: 133px;
  height: 64px;
  left: 144px;
  top: 13px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 26px;
  display: flex;
  align-items: center;

  color: #3D405B;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

const CardGrade = styled.div`
  position: absolute;
  width: 34px;
  height: 29px;
  left: 419px;
  top: 29px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #F4BE00;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const CardPoint = styled.div`
  position: absolute;
  width: 63px;
  height: 29px;
  left: 501px;
  top: 30px;

  font-family: 'Noto Sans KR';
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

const EditIcons = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 590px;
  top: 174px;

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

const CartIcons = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 660px;
  top: 174px;

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

const Favorites = styled.div`
  box-sizing: border-box;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  isolation: isolate;

  position: absolute;
  width: 501px;
  height: 224px;
  left: 174px;
  top: 234px;

  background: #FFFFFF;
  border: 2px solid #5FB393;
  border-radius: 8px;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const FavLogo = styled.div`
  width: 100px;
  height: 100px;

  /* background: url(./images/logo.png); */

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const FavTitle = styled.div`
  width: 70px;
  height: 26px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;


  flex: none;
  order: 0;
  flex-grow: 0;
`;

const FavList = styled.div`
  position: absolute;
  width: 232px;
  height: 208px;
  left: 269px;
  top: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  /* or 162% */
  display: flex;
  align-items: center;

  color: #000000;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const NoticeBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  isolation: isolate;

  position: absolute;
  width: 200px;
  height: 70px;
  left: 206px;
  top: 483px;

  background: #5FB393;
  border-radius: 8px;
  border: none;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

const ServiceBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  isolation: isolate;

  position: absolute;
  width: 200px;
  height: 70px;
  left: 427px;
  top: 483px;

  background: #5FB393;
  border-radius: 8px;
  border: 2px solid #5FB393;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;

  `;

const CommonText = styled.text`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;

  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto;

  color: #FFFFFF;
`;

const Withdrawal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  isolation: isolate;

  position: absolute;
  width: 90px;
  height: 40px;
  left: 27px;
  top: 583px;

  background: #4D4D4D;
  border-radius: 8px;

  flex: none;
  order: 6;
  flex-grow: 0;
  z-index: 6;

`;

const RestText = styled.text`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 26px;

  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto;

  color: #FFFFFF;
`;


function MyPage() {
  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>My Page</RegisterGround>
          <RegisterWhite>
            <Sublayout>
              <NameCard>
                <CardImg>img</CardImg>
                <CardNick>급한공주</CardNick>
                <CardGrade>VIP</CardGrade>
                <CardPoint>1221P</CardPoint>
              </NameCard>

              <div>
                <EditIcons>아이콘1</EditIcons>
              </div>
              <div>
                <CartIcons>아이콘2</CartIcons>
              </div>

              <Favorites>
                <FavLogo>로고</FavLogo>
                <FavTitle>즐겨찾기</FavTitle>
                <FavList>
                    <ul>
                      <li>그린컴퓨터학원 구월점</li>
                      <li>동암역</li> 
                      <li>롯데백화점 인천점</li> 
                    </ul>
                  </FavList>
              </Favorites>

              <>
                <NoticeBtn>
                  <CommonText>
                    공지사항
                  </CommonText>
                </NoticeBtn>
                <ServiceBtn>
                  <CommonText>
                    고객센터
                  </CommonText>
                </ServiceBtn>
              </>

              <Withdrawal>
                <RestText>
                  회원탈퇴
                </RestText>
              </Withdrawal>
            </Sublayout>
          </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
};

export default MyPage;