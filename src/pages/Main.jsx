import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ToiletMap from "../component/ToiletMap";
import ToiletList from "../component/ToiletList";

const MainContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5fb393;
  height: 820px;
  display: flex;
`;

const TolietListSection = styled.div`
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

function Main() {
  const [location, setLocation] = useState({
    center: {
      lat: 37.497175,
      lng: 127.027926,
    },
    errMsg: null,
    isLoading: true,
  });

  const [closestToiletLocations, setClosestToiletLocations] = useState([]);

  const [toiletLocations, setToiletLocations] = useState([]);

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
            "http://openAPI.seoul.go.kr:8088/4f61414175726b7135334b6d434b45/json/SearchPublicToiletPOIService/4001/5000"
          ),
        ]);

        const data1 = responses[0].data.SearchPublicToiletPOIService.row;
        const data2 = responses[1].data.SearchPublicToiletPOIService.row;
        const data3 = responses[2].data.SearchPublicToiletPOIService.row;
        const data4 = responses[3].data.SearchPublicToiletPOIService.row;
        const data5 = responses[4].data.SearchPublicToiletPOIService.row;
        const combinedData = [...data1, ...data2, ...data3, ...data4, ...data5];

        setToiletLocations(combinedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchToiletLocations();
  }, []);

  useEffect(() => {
    const sortedToiletLocations = toiletLocations
      .map((toiletlocation) => ({
        ...toiletlocation,
        distance: getEuclideanDistance(
          location.center.lat,
          location.center.lng,
          toiletlocation.Y_WGS84,
          toiletlocation.X_WGS84
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6);

    setClosestToiletLocations(sortedToiletLocations);
  }, [toiletLocations, location]);

  const getEuclideanDistance = (lat1, lng1, lat2, lng2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
  };
  console.log(toiletLocations);
  console.log(closestToiletLocations);

  return (
    <MainContainer>
      <TolietListSection>
        <ToiletList closestToiletLocations={closestToiletLocations} />
      </TolietListSection>
      <MapSection>
        <ToiletMap toiletLocations={toiletLocations} location={location} />
      </MapSection>
    </MainContainer>
  );
}

export default Main;
