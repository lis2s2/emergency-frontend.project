import styled from "styled-components";
import { TbRoadSign } from "react-icons/tb";
import { PiStarFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { fetchAddressFromCoords } from "../api/kakaoMapAPI";
import { useNavigate } from "react-router-dom";

const ItemContainer = styled.div`
  padding: 10px;
  height: 108px;
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
`;

const ItemButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

function ToiletListItem(props) {
  const {
    toiletLocation: { FNAME, ANAME, distance, X_WGS84, Y_WGS84, POI_ID }
  } = props;
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAddress = async () => {
      const address = await fetchAddressFromCoords(X_WGS84, Y_WGS84);
      setAddress(address);
    };
    getAddress();
  }, [X_WGS84, Y_WGS84]);

  return (
    <ItemContainer>
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
      <ItemButtonContainer>
        <SearchButton>
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
