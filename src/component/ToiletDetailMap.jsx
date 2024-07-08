import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
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
  white-space: nowrap
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

function ToiletDetailMap(props) {
  const { toilet } = props;

  const navigate = useNavigate();
  // const handleFindRoute = (lat, lng, name) => {
  //   const url = `https://map.kakao.com/link/from/내위치,${location.center.lat},${location.center.lng}/to/${name},${lat},${lng}`;
  //   window.open(url, '_blank');
  // }

  if (!toilet) {
    return <div>Loading...</div>; // 로딩 중 표시할 내용
  }

  return (
    <CustomMap
      center={{
        lat: toilet.Y_WGS84,
        lng: toilet.X_WGS84,
      }}
      style={{ width: "100%", height: "100%" }}
      level={1}
    >
      <MapMarker
        position={{
          lat: toilet.Y_WGS84,
          lng: toilet.X_WGS84,
        }}
        title="현위치"
      >
        <ToiletInfoWrapper>
          <StyledTitle>{toilet.FNAME}</StyledTitle>
          <ItemButtonContainer>
            <SearchButton>
              <StyledTbRoadSign />
              길찾기
            </SearchButton>
            <DetailButton
              onClick={() => {
                navigate(`/detail/${toilet.POI_ID}`);
              }}
            >
              상세 정보
            </DetailButton>
          </ItemButtonContainer>
        </ToiletInfoWrapper>
      </MapMarker>
    </CustomMap>
  );
}

export default ToiletDetailMap;
