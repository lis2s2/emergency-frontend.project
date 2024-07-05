import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import logoImg from "../images/logo.png";
import { useState } from "react";
import { TbRoadSign } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const CustomMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

const ToiletInfoWrapper = styled.div`
  cursor: pointer;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  border: none;
  width: 100%;
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

const ItemButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
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

function ToiletMap(props) {
  const { closestToiletLocations, location } = props;
  const [openMarkerInfo, setOpenMarkerInfo] = useState({});
  const navigate = useNavigate();

  const toggleMarker = (toiletNo) => {
    setOpenMarkerInfo((prev) => ({
      ...prev,
      [toiletNo]: !prev[toiletNo],
    }));
  };

  return (
    <CustomMap
      center={location.center}
      style={{ width: "100%", height: "100%" }}
      level={1}
    >
      <MapMarker position={location.center} title="현위치" />
      {closestToiletLocations.map((value) => {
        return (
          <MapMarker
            key={value.POI_ID}
            position={{ lat: value.Y_WGS84, lng: value.X_WGS84 }}
            title={value.FNAME}
            image={{
              src: logoImg,
              size: {
                width: 32,
                height: 32,
              },
            }}
            onClick={() => toggleMarker(value.POI_ID)}
          >
            {openMarkerInfo[value.POI_ID] && (
              <ToiletInfoWrapper onClick={() => toggleMarker(value.POI_ID)}>
                <StyledTitle>{value.FNAME}</StyledTitle>
                <ItemButtonContainer>
                  <SearchButton>
                    <StyledTbRoadSign />
                    길찾기
                  </SearchButton>
                  <DetailButton
                    onClick={() => {
                      navigate(`/detail/${value.POI_ID}`);
                    }}
                  >
                    상세 정보
                  </DetailButton>
                </ItemButtonContainer>
              </ToiletInfoWrapper>
            )}
          </MapMarker>
        );
      })}
    </CustomMap>
  );
}

export default ToiletMap;
