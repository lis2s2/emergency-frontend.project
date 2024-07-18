import styled from "styled-components";
import { TbRoadSign } from "react-icons/tb";
import { PiStarFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import {
  fetchAddressFromCoords,
  fetchWCongnamulCoord,
} from "../api/kakaoMapAPI";
import { useNavigate } from "react-router-dom";
import { getAvgScoreByToiletNo } from "../api/toiletReviewAPI";

const ItemContainer = styled.div`
  padding: 10px;
  min-height: 108px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
`;

const ItemInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  cursor: pointer;
`;

const ItemButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
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

const SearchButton = styled.button`
  padding: 0 12px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #0067c7;
  color: #ffffff;
  font-weight: 600;
  height: 38px;
  width: 100px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 4px #aaa;
  }
`;

const DetailButton = styled.button`
  padding: 0 12px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #ffffff;
  color: #0067c7;
  border: 2px solid #0067c7;
  font-weight: 600;
  height: 38px;
  width: 100px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 4px #aaa;
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

function ToiletListItem(props) {
  const {
    toiletLocation: {
      FNAME,
      ANAME,
      distance,
      X_WGS84,
      Y_WGS84,
      POI_ID,
      detail,
    },
    location,
    setMapMarker,
    mapMarker,
  } = props;
  const [address, setAddress] = useState("");
  const [toiletScore, setToiletScore] = useState(3.0);
  const navigate = useNavigate();

  const handleFindRoute = async (lat, lng, name) => {
    try {
      const startResult = await fetchWCongnamulCoord(
        location.center.lat,
        location.center.lng
      );
      const destResult = await fetchWCongnamulCoord(lat, lng);
      const url = `https://map.kakao.com/?map_type=TYPE_MAP&target=walk&rt=${startResult[0].x}%2C${startResult[0].y}%2C${destResult[0].x}%2C${destResult[0].y}&rt1=내위치&rt2=${name}&rtIds=%2C&rtTypes=%2C`;
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      const address = await fetchAddressFromCoords(Y_WGS84, X_WGS84);
      setAddress(address);
    };
    getAddress();

    const getAvgScore = async () => {
      const result = await getAvgScoreByToiletNo(POI_ID);
      setToiletScore(result);
    };
    getAvgScore();
  }, [POI_ID, X_WGS84, Y_WGS84]);

  return (
    <ItemContainer>
      <ItemInfoContainer
        onClick={() => {
          if (mapMarker === POI_ID) {
            setMapMarker("TEMP_VALUE");
            setTimeout(() => setMapMarker(POI_ID), 0);
          } else {
            setMapMarker(POI_ID);
          }
        }}
      >
        <StyledTitle>
          {FNAME} {ANAME && `(${ANAME})`}
          {detail && `(${detail})`}
        </StyledTitle>
        <ItemScoreDistanceContainer>
          <ItemScoreContainer>
            <StyledPiStarFill />
            <StyledContent>{toiletScore}</StyledContent>
          </ItemScoreContainer>
          <StyledContent>{distance}m</StyledContent>
        </ItemScoreDistanceContainer>
        <StyledContent>{address}</StyledContent>
      </ItemInfoContainer>
      <ItemButtonContainer>
        <SearchButton onClick={() => handleFindRoute(Y_WGS84, X_WGS84, FNAME)}>
          <StyledTbRoadSign />
          길찾기
        </SearchButton>
        <DetailButton
          onClick={() => {
            navigate(`/detail/${POI_ID}`);
          }}
        >
          상세 정보
        </DetailButton>
      </ItemButtonContainer>
    </ItemContainer>
  );
}

export default ToiletListItem;
