import dayjs from "dayjs";
import { PiStarFill } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";
import styled from "styled-components";
import { deleteToiletReview } from "../api/toiletReviewAPI";

const ToiletCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const WriterToiletScoreContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledId = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  text-align: start;
`;

const StyledContent = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  text-align: start;
`;
const StyledContentGray = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: darkgray;
  text-align: start;
`;

const StyledPiStarFill = styled(PiStarFill)`
  color: #f6c002;
  height: 12px;
  width: 12px;
  vertical-align: middle;
`;

const StlyedMdOutlineDeleteForever = styled(MdOutlineDeleteForever)`
  cursor: pointer;
  height: 20px;
  width: 20px;
  color: #999;
`;

const StarRating = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <StyledPiStarFill key={index} />
      ))}
    </>
  );
};

function ToiletCommentUser(props) {
  const {
    comment: { writer, reviewScore, reviewContent, regDate, reviewNo },
    handleCommentList
  } = props;

  const handleDeleteReview = () => {
    const userConfirmed = window.confirm("리뷰를 삭제하시겠습니까?");

    // 확인을 누르면 특정 함수 실행
    if (userConfirmed) {
      const deleteReview = async () => {
        const result = await deleteToiletReview(reviewNo);
        if (result.data === true) {
          alert("리뷰가 성공적으로 삭제되었습니다.");
          handleCommentList();
        } else {
          alert("네트워크 오류가 발생하였습니다.");
        }
      };
      deleteReview();
    }
  };

  return (
    <ToiletCommentContainer>
      <WriterToiletScoreContainer>
        <StyledId>{writer}</StyledId>
        <StyledContent>
          <StarRating count={reviewScore} />
        </StyledContent>
        <StyledContent>{reviewScore}</StyledContent>
        <StyledContentGray>
          {dayjs(regDate).format("YYYY-MM-DD")}
        </StyledContentGray>
        <StlyedMdOutlineDeleteForever onClick={handleDeleteReview} />
      </WriterToiletScoreContainer>
      <StyledContent>{reviewContent}</StyledContent>
    </ToiletCommentContainer>
  );
}

export default ToiletCommentUser;
