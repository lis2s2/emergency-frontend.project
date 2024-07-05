import styled from "styled-components";
import ToiletMap from "../component/ToiletMap";
import { useEffect, useState } from "react";

import { fetchToiletLocations } from "../api/toiletAPI";
import { Outlet } from "react-router-dom";

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
  // const { toiletId } = useParams();

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

    const getFetchedToiletList = async () => {
      try {
        const result = await fetchToiletLocations();
        setToiletLocations(result);
      } catch (error) {
        console.error("Error fetching toilet locations:", error);
      }
    };
    getFetchedToiletList();
  }, []);

  useEffect(() => {
    const sortedToiletLocations = toiletLocations
      .map((toiletlocation) => ({
        ...toiletlocation,
        distance: getDistanceInMeters(
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

  const getDistanceInMeters = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const toRadians = (degree) => degree * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return Math.round(distance);
  };

  console.log(process.env.REACT_APP_API_URL);

  return (
    <MainContainer>
      <TolietListSection>
        {/* {toiletId ? (
          <ToiletDetail
            closestToiletLocations={closestToiletLocations}
            toiletId={toiletId}
          />
        ) : (
          <ToiletList closestToiletLocations={closestToiletLocations} />
        )} */}
        <Outlet context={closestToiletLocations} />
      </TolietListSection>
      <MapSection>
        <ToiletMap toiletLocations={toiletLocations} location={location} />
      </MapSection>
    </MainContainer>
  );
}

export default Main;
