import styled from "styled-components";
import { Roadview } from "react-kakao-maps-sdk";
import { PiStarFill } from "react-icons/pi";
import { TbRoadSign } from "react-icons/tb";
import { useEffect, useState } from "react";
import { fetchAddressFromCoords } from "../api/kakaoMapAPI";
import toiletComments from "./toiletComments.json";
import ToiletComment from "./ToiletComment";
import { Button, Form, InputGroup } from "react-bootstrap";

const ToiletDetailContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoadViewWrapper = styled.div`
  border-radius: 12px;
  height: 280px;
  overflow: hidden;
`;

const ItemInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const ItemScoreDistanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ToiletCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchButton = styled.button`
  padding: 0 12px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #050505;
  color: #ffffff;
  font-weight: 600;
  height: 36px;
  width: 100px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
  padding: 0 12px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #050505;
  color: #ffffff;
  font-weight: 600;
  height: 36px;
  width: 100px;
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
  const { closestToiletLocations, detailViewKey } = props;
  const viewToilet = closestToiletLocations.filter((location) => {
    return location.POI_ID === detailViewKey;
  });
  const { Y_WGS84, X_WGS84, FNAME, ANAME, distance } = viewToilet[0];
  const [address, setAddress] = useState();

  const filteredCommentList = toiletComments
  .filter((comment) => comment.toilet_no === detailViewKey)  
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
      <ItemInfoContainer>
        <StyledTitle>
          {FNAME} ({ANAME})
        </StyledTitle>
        <ItemScoreDistanceContainer>
          <ItemScoreContainer>
            <StyledPiStarFill />
            <StyledContent>4.8</StyledContent>
          </ItemScoreContainer>
          <StyledContent>{distance}m</StyledContent>
        </ItemScoreDistanceContainer>
        <StyledContent>{address}</StyledContent>
      </ItemInfoContainer>
      <StlyedHr />
      <ToiletCommentContainer>
        {filteredCommentList.map((comment) => {
          return <ToiletComment key={comment.comment_no} comment={comment}/>
        })}
      </ToiletCommentContainer>
      <StlyedHr />
      <InputGroup>
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>

      <ItemButtonContainer>
        <SearchButton>
          <StyledTbRoadSign />
          길찾기
        </SearchButton>
        <DetailButton>리스트로</DetailButton>
      </ItemButtonContainer>
    </ToiletDetailContainer>
  );
}

export default ToiletDetail;
