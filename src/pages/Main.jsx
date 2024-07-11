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
  const [cafeList, setCafeList] = useState();
  const [gasList, setgasList] = useState();
  const [userToiletList, setUserToiletList] = useState();
  const [addGasList, setAddGasList] = useState(false);
  const [addCafeList, setAddCafeList] = useState(false);
  const [addUserToiletList, setAddUserToiletList] = useState(false);
  const [listUpdated, setListUpdated] = useState(false);

  const toggleCafeList = () => {
    setAddCafeList(!addCafeList);
  };

  const toggleGasList = () => {
    setAddGasList(!addGasList);
  };

  const toggleUserToiletList = () => {
    setAddUserToiletList(!addUserToiletList);
  };

  const toggleListUpdated = () => {
    setListUpdated(!listUpdated);
  }

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
        setClosestToiletLocations(sortedToiletLocations);
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

        toggleListUpdated();
      } catch (error) {
        console.error("Error fetching toilet locations:", error);
      }
    };
    getFetchedToiletList();
  }, [location]);

  useEffect(() => {
    if (closestToiletLocations.length !== 0) {
      const getUserToiletList = async () => {
        const result = await fetchUserToiletList();
        const renamedKeyList = result.map((toilet) => {
          return {
            POI_ID: toilet.toiletNo,
            X_WGS84: toilet.lng,
            Y_WGS84: toilet.lat,
            FNAME: toilet.toiletName,
            toiletAddress: toilet.toiletAddress,
            detail: toilet.detail,
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
        const mergedData = closestToiletLocations.map((origItem) => {
          const addItem = userAdditionalInfoList.find(
            (addItem) => addItem.POI_ID === origItem.POI_ID
          );
          return addItem ? { ...origItem, ...addItem } : origItem;
        });
        setClosestToiletLocations(mergedData);
      };
      getUserToiletList();
    }
  }, [listUpdated]);

  useEffect(() => {
    if (closestToiletLocations.length !== 0) {
      if (!addCafeList) {
        const filteredList = closestToiletLocations.filter(
          (value) => value.category_group_code !== "CE7"
        );
        setClosestToiletLocations(filteredList);
      } else {
        const combinedList = [...closestToiletLocations, ...cafeList];
        setClosestToiletLocations(combinedList.sort((a, b) => a.distance - b.distance));
      }
    }
  }, [addCafeList, listUpdated]);

  useEffect(() => {
    if (closestToiletLocations.length !== 0) {
      if (!addGasList) {
        const filteredList = closestToiletLocations.filter(
          (value) => value.category_group_code !== "OL7"
        );
        setClosestToiletLocations(filteredList);
      } else {
        const combinedList = [...closestToiletLocations, ...gasList];
        setClosestToiletLocations(combinedList.sort((a, b) => a.distance - b.distance));
      }
    }
  }, [addGasList, listUpdated]);

  useEffect(() => {
    if (closestToiletLocations.length !== 0) {
      if (!addUserToiletList) {
        const filteredList = closestToiletLocations.filter(
          (value) => value.memRegister !== true
        );
        setClosestToiletLocations(filteredList);
      } else {
        const combinedList = [...closestToiletLocations, ...userToiletList];
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
      }
    }
  }, [addUserToiletList, listUpdated]);

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
            toggleListUpdated: toggleListUpdated
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
