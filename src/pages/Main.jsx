import axios from "axios";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import logoImg from "../images/logo.png";

const MainContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  height: 820px;
  display: flex;
`;

const TolietListSection = styled.div`
  min-width: 492px;
  background: #fff;
  height: 100%;
  padding: 20px;
`;

const MapSection = styled.div`
  min-width: 946px;
  background-color: #c03232;
  height: 100%;
  padding: 20px 20px 20px 0;
`;

const CustomMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 24px;
`;


function Main() {
  const [location, setLocation] = useState({
    center: {
      lat: 37.497175,
      lng: 127.027926,
    },
    errMsg: null,
    isLoading: true,
  });

  const [toiletLocation, setToiletLocation] = useState([]);

  useEffect(() => {
    // if (navigator.geolocation) {
    //   // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setLocation((prev) => ({
    //         ...prev,
    //         center: {
    //           lat: position.coords.latitude, // 위도
    //           lng: position.coords.longitude, // 경도
    //         },
    //         isLoading: false,
    //       }));
    //     },
    //     (err) => {
    //       setLocation((prev) => ({
    //         ...prev,
    //         errMsg: err.message,
    //         isLoading: false,
    //       }));
    //     }
    //   );
    // } else {
    //   // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    //   setLocation((prev) => ({
    //     ...prev,
    //     errMsg: "위치를 찾을 수 없습니다.",
    //     isLoading: false,
    //   }));
    // }

    const fetchToiletLocations = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            "http://openAPI.seoul.go.kr:8088/4f61414175726b7135334b6d434b45/json/SearchPublicToiletPOIService/1/1000"
          ),
          axios.get(
            "http://openAPI.seoul.go.kr:8088/4f61414175726b7135334b6d434b45/json/SearchPublicToiletPOIService/1001/2000"
          ),
          axios.get(
            "http://openAPI.seoul.go.kr:8088/4f61414175726b7135334b6d434b45/json/SearchPublicToiletPOIService/2001/3000"
          ),
          axios.get(
            "http://openAPI.seoul.go.kr:8088/4f61414175726b7135334b6d434b45/json/SearchPublicToiletPOIService/3001/4000"
          ),
          axios.get(
            "http://openAPI.seoul.go.kr:8088/4f61414175726b7135334b6d434b45/json/SearchPublicToiletPOIService/4001/4938"
          )
        ]);

        const data1 = responses[0].data.SearchPublicToiletPOIService.row;
        const data2 = responses[1].data.SearchPublicToiletPOIService.row;
        const data3 = responses[2].data.SearchPublicToiletPOIService.row;
        const data4 = responses[3].data.SearchPublicToiletPOIService.row;
        const data5 = responses[4].data.SearchPublicToiletPOIService.row;
        const combinedData = [...data1, ...data2, ...data3, ...data4, ...data5];

        setToiletLocation(combinedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchToiletLocations();

  }, []);

  console.log(toiletLocation);


  return (
    <MainContainer>
      <TolietListSection></TolietListSection>
      <MapSection>
        <CustomMap
          center={location.center}
          style={{ width: "100%", height: "100%" }}
          level={1}
        >
          {toiletLocation.map((value) => {
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
                  }}}
              />
            );
          })}
        </CustomMap>
      </MapSection>
    </MainContainer>
  );
}

export default Main;
