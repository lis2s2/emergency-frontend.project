import styled from "styled-components";
import { TbMoodEdit } from "react-icons/tb";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import profileImg from "../images/profile.png";
import logoImg from "../images/logo.png";
import memberSlice, { selectMember } from "../features/member/memberSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  /* padding-top: 200px; */
  /* padding-right: 200px; */
  gap: 24px;

  position: absolute;
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
  padding: 12px 12px 12px 20px;
  gap: 12px;
  isolation: isolate;

  position: absolute;
  width: 550px;
  height: 88px;
  /* left: 125px; */
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
  /* left: 180px; */
  top: 13px;
  margin-left: 110px;
  /* margin: 2px; */

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
  /* right: 120px; */
  top: 29px;
  margin-left: 410px;
  /* margin: 2px; */

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
  /* left: 501px; */
  top: 30px;
  margin-left: 320px;
  /* margin: 2px; */

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

const EditIcons = styled.button`
  position: absolute;
  width: 45px;
  height: 45px;
  left: 590px;
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

const CartIcons = styled.button`
  position: absolute;
  width: 45px;
  height: 45px;
  left: 660px;
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
  margin-left: 20px;

  background: url(${logoImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const FavTitle = styled.div`
  width: 70px;
  height: 26px;
  margin-left: 10px;

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
  width: 180px;
  height: 210px;
  left: 269px;
  top: 8px;
  padding-left: 20px;
  /* margin-left: 20px; */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  /* or 162% */
  display: flex;
  align-items: center;
  text-align: left;

  color: #000000;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const NoticeBtn = styled.button`
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

const Withdrawal = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 12px 24px; */
  gap: 20px;
  isolation: isolate;

  position: absolute;
  width: 60px;
  height: 30px;
  left: 27px;
  top: 590px;

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
  /* justify-content: end; */
  margin: 0 auto;

  color: #FFFFFF;
`;


function MyPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector(selectMember);
  
  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterGround>My Page</RegisterGround>
          <RegisterWhite>
            <Sublayout>
              <NameCard>
                <CardImg />
                <CardId>{member?.memId}</CardId>
                <CardPoint>{member?.memPoint}P</CardPoint>
                <CardGrade>{member?.memGrade}</CardGrade>
              </NameCard>

              <div>
                <EditIcons><TbMoodEdit /></EditIcons>
              {/* </div>
              <div> */}
                <CartIcons onClick={() => navigate('/cart')}><PiShoppingCartSimpleBold /></CartIcons>
              </div>

              <Favorites>
                <FavLogo />
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