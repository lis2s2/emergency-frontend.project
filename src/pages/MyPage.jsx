import styled from "styled-components";
import { TbMoodEdit } from "react-icons/tb";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import profileImg from "../images/profile.png";
import logoImg from "../images/logo.png";
import { logoutSuccess } from "../features/member/memberSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  min-height: 830px;
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
`;

const Sublayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 24px;
  width: 600px;
  height: 644px;
`;

const RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  width: 850px;
  height: 644px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

const NameCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 40px;
  gap: 12px;
  width: 550px;
  background: rgba(148, 210, 187, 0.29);
  border: 2px solid #5fb393;
  border-radius: 8px;
  top: 61px;
`;

const CardImg = styled.div`
  width: 60px;
  height: 60px;
  background: url(${profileImg}) no-repeat center/cover;
`;

const CardName = styled.div`
  display: flex;
  flex: 3;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 19px;
  color: #3d405b;
  justify-content: center;
  align-items: center;
`;

const CardPoint = styled.div`
  display: flex;
  flex: 2;
  font-family: "Noto Sans KR";
  font-weight: 900;
  font-size: 20px;
  color: #000000;
  justify-content: flex-end;
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const EditIcons = styled.button`
  width: 45px;
  height: 45px;
  left: 560px;
  top: 174px;
  border-style: none;
  background-color: white;
  font-size: 40px;
  vertical-align: middle;
  line-height: 20px;
`;

const CartIcons = styled.button`
  width: 45px;
  height: 45px;
  left: 620px;
  top: 174px;

  border-style: none;
  background-color: white;
  font-size: 40px;
  vertical-align: middle;
  line-height: 20px;
`;

const Favorites = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  width: 501px;
  height: 224px;
  left: 174px;
  top: 234px;
  background: #ffffff;
  border: 2px solid #5fb393;
  border-radius: 8px;
`;

const FavLogo = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 20px;
  background: url(${logoImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
`;

const FavList = styled.div`
  width: 180px;
  height: 210px;
  left: 269px;
  top: 8px;
  padding-left: 20px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #000000;
`;

const NoticeBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  width: 200px;
  height: 70px;
  left: 210px;
  top: 483px;
  background: #5fb393;
  border-radius: 8px;
  border: none;
`;

const ServiceBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  gap: 20px;
  width: 200px;
  height: 70px;
  left: 440px;
  top: 483px;
  background: #5fb393;
  border-radius: 8px;
  border: 2px solid #5fb393;
`;

const CommonText = styled.p`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  color: #ffffff;
`;

const Withdrawal = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 60px;
  height: 30px;
  left: 27px;
  top: 590px;
  background: #4d4d4d;
  border-radius: 8px;
`;

const RestText = styled.p`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  color: #ffffff;
`;

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = JSON.parse(localStorage.getItem("member")) || {};

  const handleDeleteMember = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-member/${member.memId}`, {
          headers : {
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${token}`,
          }
        });
      if (response.status === 200) {
        window.confirm("탈퇴 하시겠습니까?");
        if (true) {
          dispatch(logoutSuccess());
          localStorage.removeItem("member");
          localStorage.removeItem("token");
          alert("회원탈퇴가 완료되었습니다.");
          navigate("/");
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
              <EditIcons onClick={() => navigate("/mypage/modify")}>
                <TbMoodEdit />
              </EditIcons>
              <CartIcons onClick={() => navigate("/cart")}>
                <PiShoppingCartSimpleBold />
              </CartIcons>
            </CardActions>
            {/* <Favorites>
              <FavLogo />
              <FavTitle>즐겨찾기</FavTitle>
              <FavList>
                <ul>
                  <li>그린컴퓨터학원 구월점</li>
                  <li>동암역</li>
                  <li>롯데백화점 인천점</li>
                </ul>
              </FavList>
            </Favorites> */}
            <>
              <NoticeBtn>
                <CommonText>공지사항</CommonText>
              </NoticeBtn>
              <ServiceBtn>
                <CommonText>고객센터</CommonText>
              </ServiceBtn>
            </>
            <Withdrawal>
              <RestText onClick={handleDeleteMember}>회원탈퇴</RestText>
            </Withdrawal>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default MyPage;
