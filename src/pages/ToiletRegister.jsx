import { useEffect, useState } from "react";
import styled from "styled-components";
import ToiletRegisterMap from "../component/ToiletRegisterMap";
import ToiletRegisterInfo from "../component/ToiletRegisterInfo";
import { fetchAddressFromCoords } from "../api/kakaoMapAPI";

const MainContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  height: 820px;
  display: flex;
`;

const RegisterInfoSection = styled.div`
  min-width: 492px;
  background: #5fb393;
  height: 100%;
  padding: 20px;
`;

const MapSection = styled.div`
  min-width: 946px;
  background-color: #5fb393;
  height: 100%;
  padding: 20px 20px 20px 0;
`;

function ToiletRegister() {
  const [location, setLocation] = useState({
    center: {
      lat: 37.504598,
      lng: 127.02506,
    },
    errMsg: null,
    isLoading: true,
  });

  const [clickedLocation, setClickedLocation] = useState();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!clickedLocation) {
      return;
    }
    const getAddress = async () => {
      const address = await fetchAddressFromCoords(clickedLocation.lat, clickedLocation.lng);
      setAddress(address);
    };
    getAddress();


  }, [ clickedLocation ]);

  return (
    <MainContainer>
      <RegisterInfoSection>
        <ToiletRegisterInfo 
          address={address}
        />
      </RegisterInfoSection>
      <MapSection>
        <ToiletRegisterMap
          location={location}
          setClickedLocation={setClickedLocation}
        />
      </MapSection>
    </MainContainer>
  );
}

export default ToiletRegister;
