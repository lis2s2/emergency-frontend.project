import { useEffect, useState } from "react";
import styled from "styled-components";
import ToiletRegisterMap from "../component/ToiletRegisterMap";
import ToiletRegisterInfo from "../component/ToiletRegisterInfo";
import { fetchAddressFromCoords } from "../api/kakaoMapAPI";

const MainContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  display: flex;
  height: 100%;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    height: 100%;
    gap: 0;
  }
`;

const RegisterInfoSection = styled.div`
  min-width: 492px;
  background: #5fb393;
  height: 830px;
  padding: 20px;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 10px;
    min-width: initial;
  }
`;

const MapSection = styled.div`
  flex: 1;
  background-color: #5fb393;
  height: 100%;
  padding: 20px 20px 20px 0;
  height: 830px;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 10px;
    min-width: initial;
    flex: none;
  }
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
          clickedLocation={clickedLocation}
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
