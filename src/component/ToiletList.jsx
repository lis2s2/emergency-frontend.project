import styled from "styled-components";
import { MdTune } from "react-icons/md";
import ToiletListItem from "./ToiletListItem";
import { useOutletContext } from "react-router-dom";

const ButtonListContainer = styled.div`
  max-height: 780px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 14px;
  border: 1px solid #605d83;
  background-color: white;
  color: #605d83;
  font-weight: 600;
`;

const ToggleButtonToggled = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 14px;
  border: 1px solid #605d83;
  background-color: #605d83;
  color: white;
  font-weight: 600;
`;

const StyledMdTune = styled(MdTune)`
  width: 30px;
  height: 30px;
  color: white;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  overflow-y: auto;
  max-height: 728px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

function ToiletList() {
  const {
    closestToiletLocations,
    location,
    toggleCafeList,
    addCafeList,
    toggleGasList,
    addGasList,
  } = useOutletContext();

  return (
    <ButtonListContainer>
      <ButtonContainer>
        {addGasList ? (
          <ToggleButtonToggled onClick={() => toggleGasList()}>
            주유소
          </ToggleButtonToggled>
        ) : (
          <ToggleButton onClick={() => toggleGasList()}>주유소</ToggleButton>
        )}
        {addCafeList ? (
          <ToggleButtonToggled onClick={() => toggleCafeList()}>
            대형 까페
          </ToggleButtonToggled>
        ) : (
          <ToggleButton onClick={() => toggleCafeList()}>
            대형 까페
          </ToggleButton>
        )}

        <ToggleButton>사용자 등록 화장실</ToggleButton>
        <StyledMdTune />
      </ButtonContainer>
      <ListContainer>
        {closestToiletLocations?.map((toiletLocation) => {
          return (
            <ToiletListItem
              key={toiletLocation.POI_ID}
              toiletLocation={toiletLocation}
              location={location}
            />
          );
        })}
      </ListContainer>
    </ButtonListContainer>
  );
}

export default ToiletList;
