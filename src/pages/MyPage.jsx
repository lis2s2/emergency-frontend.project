import styled from "styled-components";
import { TbMoodEdit } from "react-icons/tb";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import profileImg from "../images/profile.png";
import logoImg from "../images/logo.png";
import { logoutSuccess, selectMember } from "../features/member/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  gap: 24px;

  position: absolute;
  width: 850px;
  height: 644px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
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

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const NameCard = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  padding: 12px 40px;
  gap: 12px;
  width: 550px;
  background: rgba(148, 210, 187, 0.29);
  border: 2px solid #5FB393;
  border-radius: 8px;
  top: 61px;
`;

const CardImg = styled.div`
  /* margin: 0 40px; */
  width: 60px;
  height: 60px;
  background: url(${profileImg}) no-repeat center/cover;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

const CardName = styled.div`
  display: flex;
  flex: 3;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 19px;
  color: #3D405B;
  justify-content: center;
  align-items: center;
`;

const CardPoint = styled.div`
  display: flex;
  flex: 2;
  font-family: 'Noto Sans KR';
  font-weight: 900;
  font-size: 20px;
  color: #000000;
  justify-content: flex-end;
  /* margin-right: 40px; */
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const EditIcons = styled.button`
  position: absolute;
  width: 45px;
  height: 45px;
  left: 560px;
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

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
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
  left: 210px;
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
  left: 440px;
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
  margin: 0 auto;

  color: #FFFFFF;
`;

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector(selectMember);
  // const storedMember = localStorage.getItem('member') || {};
  const storedMember = localStorage.getItem('member') || {};
  // const { nickname } = storedMember.profile;
  const { name } = storedMember;
  // const { name, nickname } = storedMember.profile;

  const handleDeleteMember = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete-member/${member.memId}`);
      if (response.status === 200) {
        window.confirm('탈퇴 하시겠습니까?');
        if (true) {
          dispatch(logoutSuccess());
          localStorage.removeItem("member");
          localStorage.removeItem("token");
          alert("회원탈퇴가 완료되었습니다.");
          navigate('/');
        }
      } else {
        console.error("회원탈퇴 실패!");
      }
    } catch (error) {
      console.error("회원탈퇴 중 오류 발생:", error);
    }
  };
  
  
  return (
    <RegisterContainer>
      <Autolayout>
          <RegisterWhite>
            <Sublayout>
              <NameCard>
                <CardImg />
                <CardName>{member?.memName}</CardName>
                <CardPoint>{member?.memPoint} P</CardPoint>
              </NameCard>

              <CardActions>
                <EditIcons onClick={() => navigate('/mypage/modify')}><TbMoodEdit /></EditIcons>
              {/* </div>
              <div> */}
                <CartIcons onClick={() => navigate('/cart')}><PiShoppingCartSimpleBold /></CartIcons>
              </CardActions>

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
                <RestText onClick={handleDeleteMember}>
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