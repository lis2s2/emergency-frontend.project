import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useState } from "react";
import logoImg from "../images/logo.png";

const CustomMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

function ToiletRegisterMap(props) {
  const { location, setClickedLocation } = props;
  const [clickLocation, setClickLocation] = useState(location.center);

  const handleMapClick = (_target, mouseEvent) => {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setClickLocation({ lat, lng });
    setClickedLocation({ lat, lng });
  };
  return (
    <CustomMap
      center={location.center}
      style={{ width: "100%", height: "100%" }}
      level={0}
      onClick={handleMapClick}
    >
      <MapMarker position={location.center} />
      <MapMarker
        position={clickLocation}
        image={{
          src: logoImg,
          size: {
            width: 32,
            height: 32,
          },
        }}
      />
    </CustomMap>
  );
}

export default ToiletRegisterMap;
