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
  font-size: 16px;
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
    comment: { writer_id, score, content, regDate },
  } = props;

  return (
    <ToiletCommentContainer>
      <WriterToiletScoreContainer>
        <StyledId>{writer_id}</StyledId>
        <StyledContent>
          <StarRating count={score} />
        </StyledContent>
        <StyledContent>{score}</StyledContent>
        <StyledContentGray>{regDate}</StyledContentGray>
      </WriterToiletScoreContainer>
      <StyledContent>{content}</StyledContent>
    </ToiletCommentContainer>
  );
}

export default ToiletComment;
