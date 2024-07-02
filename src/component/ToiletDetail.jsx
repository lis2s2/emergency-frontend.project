import styled from "styled-components";
import { Roadview } from "react-kakao-maps-sdk";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { TbRoadSign } from "react-icons/tb";
import { useEffect, useState } from "react";
import { fetchAddressFromCoords } from "../api/kakaoMapAPI";
import toiletComments from "./toiletComments.json";
import ToiletComment from "./ToiletComment";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectMember } from "../features/member/memberSlice";
import { useNavigate } from "react-router-dom";

const ToiletDetailContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const RoadViewWrapper = styled.div`
  border-radius: 12px;
  height: 280px;
  overflow: hidden;
`;

const ToiletInfoCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const ToiletInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const ToiletScoreDistanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToiletScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ToiletCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MemIdScoreInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ScoreWrapper = styled.div`
  cursor: pointer;
`;

const MemIdScoreContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const SearchButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #050505;
  color: #ffffff;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const GoToListButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #050505;
  color: #ffffff;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTbRoadSign = styled(TbRoadSign)`
  height: 22px;
  width: 22px;
`;

const StyledPiStarFill = styled(PiStarFill)`
  color: #f6c002;
  height: 16px;
  width: 16px;
`;

const StyledPiStarLight = styled(PiStarLight)`
  color: #f6c002;
  height: 16px;
  width: 16px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

const StlyedHr = styled.hr`
  margin: 0;
`;

function ToiletDetail(props) {
  const { closestToiletLocations, toiletId } = props;

  const selectedToilet = closestToiletLocations.filter((location) => {
    return location.POI_ID === toiletId;
  });
  const { Y_WGS84, X_WGS84, FNAME, ANAME, distance } = selectedToilet[0];

  const member = useSelector(selectMember);

  const [address, setAddress] = useState();
  const [comment, setComment] = useState();
  const [score, setScore] = useState(3);

  const navigate = useNavigate();

  const filteredCommentList = toiletComments
    .filter((comment) => comment.toilet_no === toiletId)
    .sort((a, b) => new Date(b.regDate) - new Date(a.regDate))
    .slice(0, 4);

  useEffect(() => {
    const getAddress = async () => {
      const address = await fetchAddressFromCoords(X_WGS84, Y_WGS84);
      setAddress(address);
    };
    getAddress();
  }, [X_WGS84, Y_WGS84]);

  return (
    <ToiletDetailContainer>
      <RoadViewWrapper>
        <Roadview
          position={{
            lat: Y_WGS84,
            lng: X_WGS84,
            radius: 50,
          }}
          style={{
            width: "100%",
            height: "280px",
          }}
        />
      </RoadViewWrapper>
      <ToiletInfoCommentContainer>
        <ToiletInfoContainer>
          <StyledTitle>
            {FNAME} ({ANAME})
          </StyledTitle>
          <ToiletScoreDistanceContainer>
            <ToiletScoreContainer>
              <StyledPiStarFill />
              <StyledContent>4.8</StyledContent>
            </ToiletScoreContainer>
            <StyledContent>{distance}m</StyledContent>
          </ToiletScoreDistanceContainer>
          <StyledContent>{address}</StyledContent>
        </ToiletInfoContainer>
        {filteredCommentList.length > 0 && <StlyedHr />}
        <ToiletCommentContainer>
          {filteredCommentList.map((comment) => {
            return <ToiletComment key={comment.comment_no} comment={comment} />;
          })}
        </ToiletCommentContainer>
        {filteredCommentList.length > 0 && <StlyedHr />}
        <MemIdScoreInputContainer>
          <MemIdScoreContainer>
            <StyledTitle>{member.memId}</StyledTitle>
            <ScoreWrapper>
              {[...Array(score)].map((a, i) => (
                <StyledPiStarFill
                  className="star-lg"
                  key={i}
                  onClick={() => setScore(i + 1)}
                />
              ))}
              {[...Array(5 - score)].map((a, i) => (
                <StyledPiStarLight
                  className="star-lg"
                  key={i}
                  onClick={() => setScore(score + i + 1)}
                />
              ))}
            </ScoreWrapper>
          </MemIdScoreContainer>
          <InputGroup>
            <Form.Control
              placeholder="댓글을 입력하세요."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button variant="outline-secondary" id="button-addon2">
              저장
            </Button>
          </InputGroup>
        </MemIdScoreInputContainer>
      </ToiletInfoCommentContainer>
      <ButtonContainer>
        <SearchButton>
          <StyledTbRoadSign />
          길찾기
        </SearchButton>
        <SearchButton>
          <StyledTbRoadSign />
          편의점 경유 길찾기
        </SearchButton>
        <GoToListButton onClick={() => navigate("/")}>돌아가기</GoToListButton>
      </ButtonContainer>
    </ToiletDetailContainer>
  );
}

export default ToiletDetail;
