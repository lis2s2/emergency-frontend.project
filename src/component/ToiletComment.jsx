import dayjs from "dayjs";
import { PiStarFill } from "react-icons/pi";
import styled from "styled-components";

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

const StarRating = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <StyledPiStarFill key={index} />
      ))}
    </>
  );
};



function ToiletComment(props) {
  const {
    comment: { writer, reviewScore, reviewContent, regDate },
  } = props;

  const idMasking = writer.slice(0, 3) + '*'.repeat(6 - writer.slice(0, 3).length);


  return (
    <ToiletCommentContainer>
      <WriterToiletScoreContainer>
        <StyledId>{idMasking}</StyledId>
        <StyledContent>
          <StarRating count={reviewScore} />
        </StyledContent>
        <StyledContent>{reviewScore}</StyledContent>
        <StyledContentGray>{dayjs(regDate).format('YYYY-MM-DD')}</StyledContentGray>
      </WriterToiletScoreContainer>
      <StyledContent>{reviewContent}</StyledContent>
    </ToiletCommentContainer>
  );
}

export default ToiletComment;
