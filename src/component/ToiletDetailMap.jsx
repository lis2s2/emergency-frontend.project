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
  /* width: 236px; */
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

function ToiletDetailMap(props) {
  const { toilet } = props;

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
          {/* <ItemButtonContainer>
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
          </ItemButtonContainer> */}
        </ToiletInfoWrapper>
      </MapMarker>
    </CustomMap>
  );
}

export default ToiletDetailMap;
