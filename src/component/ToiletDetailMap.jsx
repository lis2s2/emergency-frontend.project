import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import paperImg from "../images/paper.png";
import saparatedImg from "../images/separated.png";
import disabledImg from "../images/disabled.png";
import diaperImg from "../images/diaper.png";

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
  justify-content: space-between;
  gap: 12px;
  min-height : 82px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #0067c7;
  text-align: start;
  vertical-align: middle;
  border: none;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 28px;
  height: 28px;
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
          <StyledTitle>
            {toilet.FNAME} {toilet.ANAME && `(${toilet.ANAME})`}
          </StyledTitle>
          <IconContainer>
            {toilet.disabled === true && <StyledImg src={disabledImg} />}
            {toilet.diaper === true && <StyledImg src={diaperImg} />}
            {toilet.separated === true && <StyledImg src={saparatedImg} />}
            {toilet.paper === true && <StyledImg src={paperImg} />}
          </IconContainer>
        </ToiletInfoWrapper>
      </MapMarker>
    </CustomMap>
  );
}

export default ToiletDetailMap;
