import styled from "styled-components";
import { TbMoodEdit } from "react-icons/tb";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import familyImg from "../images/family_icon.png";
import vipImg from "../images/vip_icon.png";
import { logoutSuccess, selectMember } from "../features/member/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchReviewListByWriter } from "../api/toiletReviewAPI";
import ToiletComment from "../component/ToiletComment";

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
  justify-content: space-between;
  padding: 20px;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

const RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 24px;
  width: 600px;
  height: 644px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

const NameCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 40px;
  gap: 32px;
  width: 100%;
  background: rgba(148, 210, 187, 0.29);
  border: 2px solid #5fb393;
  border-radius: 8px;
`;

const ReviewList = styled.div`
  padding: 16px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: rgba(148, 210, 187, 0.29);
  border: 2px solid #5fb393;
  border-radius: 8px;
  flex: 1;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: start;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const ToiletReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const ToiletNameReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
`;

const ToiletName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  text-align: start;
  vertical-align: middle;
  white-space: nowrap;
`;

const CardImg = styled.img`
  height: 80px;
`;

const CardName = styled.div`
  flex: 1;
  font-family: "Noto Sans KR";
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  text-align: start;
`;

const CardPoint = styled.div`
  display: flex;
  font-family: "Noto Sans KR";
  font-weight: 600;
  font-size: 20px;
  color: #000000;
  justify-content: flex-end;
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const EditIcons = styled.button`
  width: 45px;
  height: 45px;
  border-style: none;
  background-color: white;
  font-size: 40px;
  vertical-align: middle;
`;

const CartIcons = styled.button`
  width: 45px;
  height: 45px;
  border-style: none;
  background-color: white;
  font-size: 40px;
  vertical-align: middle;
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
  font-weight: 600;
  font-size: 20px;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector(selectMember);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const getReviewByWriter = async () => {
      const review = await fetchReviewListByWriter();
      setReviewList(review);
    };
    getReviewByWriter();
  }, []);

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
            <CardActions>
              <EditIcons onClick={() => navigate("/mypage/modify")}>
                <TbMoodEdit />
              </EditIcons>
              <CartIcons onClick={() => navigate("/cart")}>
                <PiShoppingCartSimpleBold />
              </CartIcons>
            </CardActions>
            <NameCard>
              <CardImg
                src={member?.memGrade === "FAMILY" ? familyImg : vipImg}
              />
              <CardName>
                {member?.memName}님 ({member?.memGrade})
              </CardName>
              <CardPoint>
                {Number(member?.memPoint).toLocaleString("ko-KR")} P
              </CardPoint>
            </NameCard>
            <ReviewList>
              <ToiletReviewContainer>
                <StyledTitle>내가 쓴 댓글</StyledTitle>
                {reviewList?.map((comment) => {
                  return (
                    <ToiletNameReviewContainer
                      onClick={() => navigate(`/detail/${comment.toiletNo}`)}
                      key={comment.reviewNo}
                    >
                      <ToiletName>{comment.toiletTitle}</ToiletName>
                      <ToiletComment comment={comment} />
                    </ToiletNameReviewContainer>
                  );
                })}
              </ToiletReviewContainer>
            </ReviewList>
            <ButtonContainer>
              <NoticeBtn>
                <CommonText>공지사항</CommonText>
              </NoticeBtn>
              <ServiceBtn>
                <CommonText>고객센터</CommonText>
              </ServiceBtn>
            </ButtonContainer>
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
