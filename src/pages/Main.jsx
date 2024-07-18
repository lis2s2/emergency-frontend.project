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
  display: flex;
  height: 100%;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    height: 100%;
    gap: 0;
  }
`;

const TolietListSection = styled.div`
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

function Main() {
  const [location, setLocation] = useState({
    center: {
      lat: 37.504598,
      lng: 127.02506,
    },
    errMsg: null,
    isLoading: true,
  });
  
  const memGrade = JSON.parse(localStorage.getItem("member"))?.memGrade || "";
  const [closestToiletLocations, setClosestToiletLocations] = useState([]);
  const [closestToiletAll, setClosestToiletAll] = useState();
  const [cafeList, setCafeList] = useState();
  const [gasList, setgasList] = useState();
  const [userToiletList, setUserToiletList] = useState();
  const [addGasList, setAddGasList] = useState(false);
  const [addCafeList, setAddCafeList] = useState(false);
  const [addUserToiletList, setAddUserToiletList] = useState(false);
  const [listUpdated, setListUpdated] = useState(false);
  const { toiletNo } = useParams();
  const [mapMarker, setMapMarker] = useState('');

  useEffect(() => {
    const getFetchedToiletList = async () => {
      try {
        const result = await fetchToiletLocations();
        const sortedToiletLocations = result
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
        const UserResult = await fetchUserToiletList();
        const renamedKeyList = UserResult.map((toilet) => {
          return {
            POI_ID: toilet.toiletNo,
            X_WGS84: toilet.lng,
            Y_WGS84: toilet.lat,
            FNAME: toilet.toiletName,
            toiletAddress: toilet.toiletAddress,
            ANAME: toilet.detail,
            diaper: toilet.diaper,
            disabled: toilet.disabled,
            memRegister: toilet.memRegister,
            paper: toilet.paper,
            separated: toilet.separated,
            toiletStatus: toilet.toiletStatus,
          };
        });
        const userRegToiletList = renamedKeyList.filter(
          (toilet) => toilet.memRegister === true
        );
        setUserToiletList(userRegToiletList);

        const userAdditionalInfoList = renamedKeyList.filter(
          (toilet) => toilet.memRegister === false
        );
        let toiletUserInfoMergedData = sortedToiletLocations.map((origItem) => {
          const addItem = userAdditionalInfoList.find(
            (addItem) => addItem.POI_ID === origItem.POI_ID
          );
          return addItem ? { ...origItem, ...addItem } : origItem;
        });
        const CafeResult = await fetchCafeList(
          location.center.lat,
          location.center.lng
        );
        const cafeMergedData = CafeResult.map((origItem) => {
          const addItem = userAdditionalInfoList.find(
            (addItem) => addItem.POI_ID === origItem.POI_ID
          );
          return addItem ? { ...origItem, ...addItem } : origItem;
        });
        setCafeList(cafeMergedData);

        const GasResult = await fetchGasStationList(
          location.center.lat,
          location.center.lng
        );
        const gasMergedData = GasResult.map((origItem) => {
          const addItem = userAdditionalInfoList.find(
            (addItem) => addItem.POI_ID === origItem.POI_ID
          );
          return addItem ? { ...origItem, ...addItem } : origItem;
        });
        setgasList(gasMergedData);

        if (addCafeList) {
          toiletUserInfoMergedData = handleCafeList(
            addCafeList,
            toiletUserInfoMergedData,
            cafeMergedData
          );
        }
        if (addGasList) {
          toiletUserInfoMergedData = handleGasList(
            addGasList,
            toiletUserInfoMergedData,
            gasMergedData
          );
        }
        if (addUserToiletList) {
          toiletUserInfoMergedData = handelUserToiletList(
            addUserToiletList,
            toiletUserInfoMergedData,
            userRegToiletList
          );
        }
        setClosestToiletLocations(toiletUserInfoMergedData);

        const allCombinedList = [
          ...toiletUserInfoMergedData,
          ...cafeMergedData,
          ...gasMergedData,
          ...userRegToiletList,
        ]
          .map((toiletlocation) => ({
            ...toiletlocation,
            distance: getDistanceInMeters(
              location.center.lat,
              location.center.lng,
              toiletlocation.Y_WGS84,
              toiletlocation.X_WGS84
            ),
          }))
          .sort((a, b) => a.distance - b.distance);
        setClosestToiletAll(allCombinedList);
      } catch (error) {
        console.error("Error fetching toilet locations:", error);
      }
    };
    getFetchedToiletList();
  }, [location, listUpdated]);

  const toggleCafeList = () => {
    setAddCafeList(!addCafeList);
    handleCafeList(!addCafeList, closestToiletLocations, cafeList);
  };

  const handleCafeList = (value, base, add) => {
    if (value) {
      const combinedList = [...base, ...add];
      setClosestToiletLocations(
        combinedList.sort((a, b) => a.distance - b.distance)
      );
      return combinedList.sort((a, b) => a.distance - b.distance);
    } else {
      const filteredList = base.filter(
        (item) => item.category_group_code !== "CE7"
      );
      setClosestToiletLocations(filteredList);
    }
  };
  const toggleGasList = () => {
    setAddGasList(!addGasList);
    handleGasList(!addGasList, closestToiletLocations, gasList);
  };

  const handleGasList = (value, base, add) => {
    if (value) {
      const combinedList = [...base, ...add];
      setClosestToiletLocations(
        combinedList.sort((a, b) => a.distance - b.distance)
      );
      return combinedList.sort((a, b) => a.distance - b.distance);
    } else {
      const filteredList = closestToiletLocations.filter(
        (item) => item.category_group_code !== "OL7"
      );
      setClosestToiletLocations(filteredList);
    }
  };

  const toggleUserToiletList = () => {
    if (memGrade !== "VIP") {
      alert("VIP 회원만 조회 가능합니다.");
      return;
    }
    setAddUserToiletList(!addUserToiletList);
    handelUserToiletList(
      !addUserToiletList,
      closestToiletLocations,
      userToiletList
    );
  };

  const handelUserToiletList = (value, base, add) => {
    if (value) {
      const combinedList = [...base, ...add];
      const sortedToiletLocations = combinedList
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
      return sortedToiletLocations;
    } else {
      const filteredList = base.filter((item) => item.memRegister !== true);
      setClosestToiletLocations(filteredList);
    }
  };

  const toggleListUpdated = () => {
    setListUpdated(!listUpdated);
  };

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
            toggleListUpdated: toggleListUpdated,
            toilet: closestToiletAll?.find(
              (toilet) => toilet.POI_ID === toiletNo
            ),
            setClosestToiletLocations: setClosestToiletLocations,
            setMapMarker: setMapMarker,
            mapMarker: mapMarker
          }}
        />
      </TolietListSection>
      <MapSection>
        {toiletNo ? (
          <ToiletDetailMap
            toilet={closestToiletAll?.find(
              (toilet) => toilet.POI_ID === toiletNo
            )}
          />
        ) : (
          <ToiletMap
            closestToiletLocations={closestToiletLocations}
            location={location}
            mapMarker={mapMarker}
          />
        )}
      </MapSection>
    </MainContainer>
  );
}

export default Main;
