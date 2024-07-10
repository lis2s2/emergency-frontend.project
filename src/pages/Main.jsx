import styled from "styled-components";
import ToiletMap from "../component/ToiletMap";
import { useEffect, useState } from "react";

import { fetchToiletLocations, fetchUserToiletList } from "../api/toiletAPI";
import { Outlet, useParams } from "react-router-dom";
import ToiletDetailMap from "../component/ToiletDetailMap";
import { fetchCafeList, fetchGasStationList } from "../api/kakaoMapAPI";

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
      lat: 37.504598,
      lng: 127.02506,
    },
    errMsg: null,
    isLoading: true,
  });
  const { toiletNo } = useParams();

  const [closestToiletLocations, setClosestToiletLocations] = useState([]);
  const [toiletLocations, setToiletLocations] = useState([]);
  const [cafeList, setCafeList] = useState([]);
  const [gasList, setgasList] = useState([]);
  const [userToiletList, setUserToiletList] = useState([]);
  const [addGasList, setAddGasList] = useState(false);
  const [addCafeList, setAddCafeList] = useState(false);
  const [addUserToiletList, setAddUserToiletList] = useState(false);

  console.log(addGasList);
  console.log(addCafeList);
  console.log(addUserToiletList);
  const toggleCafeList = () => {
    setAddCafeList(!addCafeList);
  };

  const toggleGasList = () => {
    setAddGasList(!addGasList);
  };

  const toggleUserToiletList = () => {
    setAddUserToiletList(!addUserToiletList);
  };

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
    const getFetchedToiletList = async () => {
      try {
        const result = await fetchToiletLocations();
        setToiletLocations(result);
      } catch (error) {
        console.error("Error fetching toilet locations:", error);
      }
    };
    getFetchedToiletList();
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
      .filter((value) => value.distance < 500);

    setClosestToiletLocations(sortedToiletLocations);
    console.log(sortedToiletLocations);
  }, [toiletLocations, location]);

  useEffect(() => {
    try {
      const getCafeList = async () => {
        const result = await fetchCafeList(
          location.center.lat,
          location.center.lng
        );
        setCafeList(result);
      };
      getCafeList();

      const getGasList = async () => {
        const result = await fetchGasStationList(
          location.center.lat,
          location.center.lng
        );
        setgasList(result);
      };
      getGasList();

      const getUserToiletList = async () => {
        const result = await fetchUserToiletList();
        setUserToiletList(result.filter((toilet) => toilet.memRegister = true));
      };
      getUserToiletList();
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  useEffect(() => {
    if (!addCafeList) {
      const filteredList = closestToiletLocations.filter(
        (value) => value.category_group_code !== "CE7"
      );
      setClosestToiletLocations(filteredList);
    } else {
      const combinedList = [...closestToiletLocations, ...cafeList];
      setClosestToiletLocations(combinedList);
      console.log(cafeList);
    }
  }, [addCafeList]);

  useEffect(() => {
    if (!addGasList) {
      const filteredList = closestToiletLocations.filter(
        (value) => value.category_group_code !== "OL7"
      );
      setClosestToiletLocations(filteredList);
    } else {
      const combinedList = [...closestToiletLocations, ...gasList];
      setClosestToiletLocations(combinedList);
    }
  }, [addGasList]);

  useEffect(() => {
    if (!addUserToiletList) {
      const filteredList = closestToiletLocations.filter(
        (value) => value.memRegister !== true
      );
      setClosestToiletLocations(filteredList);
    } else {
      const additionalDataMap = userToiletList.reduce((acc, item) => {
        acc[item.toiletNo] = item;
        return acc;
      }, {});
      console.log(additionalDataMap);
      const mergedList = closestToiletLocations.map((item) => {
        if (additionalDataMap[item.POI_ID]) {
          const { toiletNo, ...additionalFields } = additionalDataMap[item.POI_ID];
          return { ...item, ...additionalFields };
        }
        return item;
      });
      console.log(mergedList);
      setClosestToiletLocations(mergedList);
    }
  }, [addUserToiletList, userToiletList]);




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

  return (
    <MainContainer>
      <TolietListSection>
        <Outlet
          context={{
            closestToiletLocations: closestToiletLocations,
            location: location,
            toggleCafeList: toggleCafeList,
            addCafeList: addCafeList,
            toggleGasList: toggleGasList,
            addGasList: addGasList,
            toggleUserToiletList: toggleUserToiletList,
            addUserToiletList: addUserToiletList,
          }}
        />
      </TolietListSection>
      <MapSection>
        {toiletNo ? (
          <ToiletDetailMap
            toilet={closestToiletLocations?.find(
              (toilet) => toilet.POI_ID === toiletNo
            )}
          />
        ) : (
          <ToiletMap
            closestToiletLocations={closestToiletLocations}
            location={location}
          />
        )}
      </MapSection>
    </MainContainer>
  );
}

export default Main;
