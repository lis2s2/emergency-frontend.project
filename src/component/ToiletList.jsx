import styled from "styled-components";
import { MdTune } from "react-icons/md";
import ToiletListItem from "./ToiletListItem";
import { useOutletContext } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const ButtonListContainer = styled.div`
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ToggleButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border-radius: 14px;
  border: 1px solid #605d83;
  background-color: white;
  color: #605d83;
  font-weight: 600;
`;

const ToggleButtonToggled = styled.button`
  padding: 10px;
  font-size: 16px;
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
  max-height: 734px;
  height: 100%;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const StyledFormCheck = styled(Form.Check)`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const StyledFilterButton = styled(StyledMdTune)`
  cursor: pointer;
`;

function ToiletList() {
  const {
    closestToiletLocations,
    location,
    toggleCafeList,
    addCafeList,
    toggleGasList,
    addGasList,
    toggleUserToiletList,
    addUserToiletList,
    setClosestToiletLocations
  } = useOutletContext();

  const [separatedChecked, setSeparatedChecked] = useState(false);
  const [disabledChecked, setDisabledChecked] = useState(false);
  const [diaperChecked, setDiaperChecked] = useState(false);
  const [paperChecked, setPaperChecked] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [unfilteredList, setUnfilteredList] = useState();
  const [filteredList, setFilteredList] = useState();
  const asyncDataLoaded = useRef(false);


  useEffect(() => {
    if (closestToiletLocations.length !== 0 && !asyncDataLoaded.current) {
      setUnfilteredList(closestToiletLocations);
      setFilteredList(closestToiletLocations);
    }
  }, [closestToiletLocations]);

  const handleClose = () => setRegModalShow(false);
  const hadleModlaShow = () => setRegModalShow(true);

  const handleSeparatedChange = (e) => {
    setSeparatedChecked(e.target.checked);
  };
  const handleDisabledChange = (e) => {
    setDisabledChecked(e.target.checked);
  };
  const handleDiaperChange = (e) => {
    setDiaperChecked(e.target.checked);
  };
  const handlePaperChange = (e) => {
    setPaperChecked(e.target.checked);
  };

  const handleToiletFilter = () => {
    let filtedToiletList = filteredList;
    console.log(filtedToiletList);
    if (separatedChecked) {
      filtedToiletList = filtedToiletList.filter(toilet => toilet.separated === true)
    }
    console.log(filtedToiletList);
    if (disabledChecked) {
      filtedToiletList = filtedToiletList.filter(toilet => toilet.disabled === true)
    }
    if (diaperChecked) {
      filtedToiletList = filtedToiletList.filter(toilet => toilet.diaper === true)
    }
    if (paperChecked) {
      filtedToiletList = filtedToiletList.filter(toilet => toilet.paper === true)
    }
    setClosestToiletLocations(filtedToiletList);
    setFilteredList(unfilteredList);
    asyncDataLoaded.current = true;
    handleClose();

  };

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
        {addUserToiletList ? (
          <ToggleButtonToggled onClick={() => toggleUserToiletList()}>
            사용자 등록 화장실
          </ToggleButtonToggled>
        ) : (
          <ToggleButton onClick={() => toggleUserToiletList()}>
            사용자 등록 화장실
          </ToggleButton>
        )}
        <StyledFilterButton onClick={hadleModlaShow}/>
      </ButtonContainer>
      <Modal
        show={regModalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>화장실 필터 적용</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledFormCheck
            type="checkbox"
            id="separated-checkbox"
            label="남녀 화장실 구분"
            checked={separatedChecked}
            onChange={handleSeparatedChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="disabled-checkbox"
            label="장애인 화장실"
            checked={disabledChecked}
            onChange={handleDisabledChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="diaper-checkbox"
            label="아기 기저귀 갈이대"
            checked={diaperChecked}
            onChange={handleDiaperChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="paper-checkbox"
            label="화장지가 구비"
            checked={paperChecked}
            onChange={handlePaperChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button
            variant="primary"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "#0067c7",
            }}
            onClick={() => {handleToiletFilter()}}
          >
            적용하기
          </Button>
        </Modal.Footer>
      </Modal>
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
