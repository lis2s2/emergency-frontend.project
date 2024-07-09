import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { fetchCVSCoord, fetchWCongnamulCoord } from "../api/kakaoMapAPI";

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
  width: 236px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  border: none;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchButton = styled.button`
  padding: 0 12px;
  font-size: 14px;
  border: none;
  background-color: #0d0d0d;
  color: #ffffff;
  font-weight: 600;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
`;

const ItemButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

function ToiletDetailMap(props) {
  const { toilet, location } = props;

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

  const handleFindRouteWithCVS = async (lat, lng, name) => {
    try {
      const startResult = await fetchWCongnamulCoord(
        location.center.lat,
        location.center.lng
      );
      const CVSCoord = await fetchCVSCoord(lat, lng);
      console.log(CVSCoord);
      const CVSResult = await fetchWCongnamulCoord(
        CVSCoord[0].y,
        CVSCoord[0].x
      );
      console.log(CVSResult);

      const destResult = await fetchWCongnamulCoord(lat, lng);

      const url = `https://map.kakao.com/?map_type=TYPE_MAP&target=walk&rt=${startResult[0].x}%2C${startResult[0].y}%2C${CVSResult[0].x}%2C${CVSResult[0].y}%2C${destResult[0].x}%2C${destResult[0].y}&rt1=내위치&rt2=${CVSCoord[0].place_name}&rt2=${name}&rtIds=%2C&rtTypes=%2C`;
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

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
          <StyledTitle>{toilet.FNAME}({toilet.ANAME})</StyledTitle>
          <ItemButtonContainer>
            <SearchButton
              onClick={() =>
                handleFindRoute(toilet.Y_WGS84, toilet.X_WGS84, toilet.FNAME)
              }
            >
              길찾기
            </SearchButton>
            <SearchButton
              onClick={() => {
                handleFindRouteWithCVS(
                  toilet.Y_WGS84,
                  toilet.X_WGS84,
                  toilet.FNAME
                );
              }}
            >
              편의점 경유 길찾기
            </SearchButton>
          </ItemButtonContainer>
        </ToiletInfoWrapper>
      </MapMarker>
    </CustomMap>
  );
}

export default ToiletDetailMap;
