import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import logoImg from "../images/logo.png";

const CustomMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

function ToiletMap(props) {
  const { toiletLocations, location } = props;

  
  return (
    <CustomMap
      center={location.center}
      style={{ width: "100%", height: "100%" }}
      level={1}
    > 
      <MapMarker 
        position={ location.center }
        title="현위치"
      />
      {toiletLocations.map((value) => {
        return (
          <MapMarker
            key={value.POI_ID}
            position={{ lat: value.Y_WGS84, lng: value.X_WGS84 }}
            title={value.FNAME}
            image={{
              src: logoImg,
              size: {
                width: 32,
                height: 32
              }
            }}
          />
        );
      })}
    </CustomMap>
  );
}

export default ToiletMap;
