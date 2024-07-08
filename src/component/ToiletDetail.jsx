import styled from "styled-components";
import { Roadview } from "react-kakao-maps-sdk";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { TbRoadSign } from "react-icons/tb";
import { useEffect, useState } from "react";
import { fetchAddressFromCoords } from "../api/kakaoMapAPI";
import ToiletComment from "./ToiletComment";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectMember } from "../features/member/memberSlice";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  fetchReviewListByToiletNo,
  getAvgScoreByToiletNo,
  registerToiletReview,
} from "../api/toiletReviewAPI";

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
  gap: 12px;
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
  flex: 1;
  overflow-y: auto;
  max-height: 200px;
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

function ToiletDetail() {
  const { closestToiletLocations, location } = useOutletContext();
  const { toiletNo } = useParams();
  const member = useSelector(selectMember);
  const navigate = useNavigate();

  const handleFindRoute = (lat, lng, name) => {
    const url = `https://map.kakao.com/link/from/내위치,${location.center.lat},${location.center.lng}/to/${name},${lat},${lng}`;
    window.open(url, '_blank');
  }

  const selectedToilet = closestToiletLocations.filter((location) => {
    return location.POI_ID === toiletNo;
  });
  const { Y_WGS84, X_WGS84, FNAME, ANAME, distance } = selectedToilet[0] || {};

  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [inputScore, setInputScore] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [toiletScore, setToiletScore] = useState(3.0);

  useEffect(() => {
    const getAddress = async () => {
      if (X_WGS84 === undefined) {
        return;
      }
      const address = await fetchAddressFromCoords(Y_WGS84, X_WGS84);
      setAddress(address);
      setIsLoading(true);
    };
    getAddress();
  }, [X_WGS84, Y_WGS84]);

  useEffect(() => {
    const getReviewList = async () => {
      const result = await fetchReviewListByToiletNo(toiletNo);
      setCommentList(result);
    };
    getReviewList();

    const getAvgScore = async () => {
      const result = await getAvgScoreByToiletNo(toiletNo);
      setToiletScore(result);
    };
    getAvgScore();
  }, [toiletNo]);

  const sortedCommentList = commentList
    ?.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));


  const handleReviewButton = async () => {
    if (comment) {
      const result = await registerToiletReview(toiletNo, comment, inputScore);
      setComment("");
      if (result) {
        const getReviewList = async () => {
          const result = await fetchReviewListByToiletNo(toiletNo);
          setCommentList(result);
        };
        getReviewList();
      }
    } else {
      window.alert('내용을 입력하세요');
    }
    
  };

  if (!isLoading) {
    return;
  }

  

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
              <StyledContent>{toiletScore}</StyledContent>
            </ToiletScoreContainer>
            <StyledContent>{distance}m</StyledContent>
          </ToiletScoreDistanceContainer>
          <StyledContent>{address}</StyledContent>
        </ToiletInfoContainer>
        {sortedCommentList?.length > 0 && <StlyedHr />}
        <ToiletCommentContainer>
          {sortedCommentList?.map((comment) => {
            return <ToiletComment key={comment.reviewNo} comment={comment} />;
          })}
        </ToiletCommentContainer>
        {sortedCommentList?.length > 0 && <StlyedHr />}
        <MemIdScoreInputContainer>
          <MemIdScoreContainer>
            <StyledTitle>{member ? member.memId : '로그인해 주세요.'}</StyledTitle>
            <ScoreWrapper>
              {[...Array(inputScore)].map((a, i) => (
                <StyledPiStarFill
                  className="star-lg"
                  key={i}
                  onClick={() => setInputScore(i + 1)}
                />
              ))}
              {[...Array(5 - inputScore)].map((a, i) => (
                <StyledPiStarLight
                  className="star-lg"
                  key={i}
                  onClick={() => setInputScore(inputScore + i + 1)}
                />
              ))}
            </ScoreWrapper>
          </MemIdScoreContainer>
          <InputGroup>
            <Form.Control
              placeholder="댓글을 입력하세요."
              disabled={!member}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              disabled={!member}
              onClick={handleReviewButton}
            >
              저장
            </Button>
          </InputGroup>
        </MemIdScoreInputContainer>
      </ToiletInfoCommentContainer>
      <ButtonContainer>
        <SearchButton onClick={() => handleFindRoute(Y_WGS84, X_WGS84, FNAME)}>
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
