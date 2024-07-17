import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCoins } from "react-icons/fa6";
import { registerToilet } from "../api/toiletRegistorAPI";
import uuid from "react-uuid";
import { fetchMemberById } from "../api/memberAPI";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, selectMember } from "../features/member/memberSlice";

const ToiletRegisterInfoContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ToiletRegisterInputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

const StyledContentRed = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #ff0000;
  text-align: start;
  vertical-align: middle;
`;

const StyledFormCheck = styled(Form.Check)`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 12px;
`;

const GoToListButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #0067c7;
  color: #ffffff;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.3;
`;

const ToiletRegisterButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #0067c7;
  color: #ffffff;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledFaCoins = styled(FaCoins)`
    @media screen and (max-width: 767px) {
    display: none;
  }
`;

function ToiletRegisterInfo(props) {
  const { address, clickedLocation } = props;
  const member = useSelector(selectMember);
  const dispatch = useDispatch();
  const [toiletTitle, setToiletTitle] = useState();
  const [toiletDetail, setToiletDetail] = useState();
  const [separatedChecked, setSeparatedChecked] = useState(false);
  const [disabledChecked, setDisabledChecked] = useState(false);
  const [diaperChecked, setDiaperChecked] = useState(false);
  const [paperChecked, setPaperChecked] = useState(false);

  const navigate = useNavigate();


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

  const handleToileRegistor = async () => {
    if (address && toiletTitle) {
      const toiletNo = uuid();
      const result = await registerToilet(
        toiletNo,
        clickedLocation.lat,
        clickedLocation.lng,
        address,
        toiletTitle,
        toiletDetail,
        separatedChecked,
        disabledChecked,
        diaperChecked,
        paperChecked
      );
      if (result.status === 201) {
        alert('감사합니다. 1000포인트가 지급되었습니다.')
        const getMemberByID = async () => {
          const result = await fetchMemberById(member.memId);
          localStorage.setItem("member", JSON.stringify(result));
          dispatch(loginSuccess(result));
        };
        getMemberByID();
      } else {
        alert('화장실 등록 중 오류가 발생하였습니다.');
      }
      if (result.data === 'VIP') {
        alert('축하합니다. VIP 등급으로 변경되었습니다.')
      }
      navigate("/");
    } else {
      alert('건물 이름, 주소를 입력하세요.');
    }
    
  };

  return (
    <ToiletRegisterInfoContainer>
      <ToiletRegisterInputContainer>
        <InputContainer className="mb-3">
          <StyledLabel htmlFor="toilet_title" className="form-label">
            <StyledTitle>장소명</StyledTitle>
            <StyledContentRed>(필수)</StyledContentRed>
          </StyledLabel>
          <input
            type="text"
            className="form-control"
            id="toilet_title"
            placeholder="화장실 건물 이름을 입력하세요."
            onChange={(e) => setToiletTitle(e.target.value)}
            value={toiletTitle}
          />
        </InputContainer>
        <InputContainer className="mb-3">
          <StyledLabel htmlFor="toilet_location" className="form-label">
            <StyledTitle>주소</StyledTitle>
            <StyledContentRed>(필수)</StyledContentRed>
          </StyledLabel>
          <input
            type="text"
            className="form-control"
            id="toilet_location"
            placeholder="지도를 클릭해서 주소를 입력하세요."
            readOnly
            value={address}
          />
        </InputContainer>
        <InputContainer className="mb-3">
          <StyledLabel htmlFor="toilet_detail" className="form-label">
            <StyledTitle>상세주소</StyledTitle>
          </StyledLabel>
          <input
            type="text"
            className="form-control"
            id="toilet_detail"
            placeholder="건물 층 수 및 화장실 위치를 입력하세요."
            onChange={(e) => setToiletDetail(e.target.value)}
            value={toiletDetail}
          />
        </InputContainer>
        <CheckboxContainer className="mb-3">
          <StyledFormCheck
            type="checkbox"
            id="separated-checkbox"
            label="남녀 화장실이 구분되어 있습니다."
            checked={separatedChecked}
            onChange={handleSeparatedChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="disabled-checkbox"
            label="장애인 화장실이 있습니다."
            checked={disabledChecked}
            onChange={handleDisabledChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="diaper-checkbox"
            label="아기 기저귀 갈이대가 있습니다."
            checked={diaperChecked}
            onChange={handleDiaperChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="paper-checkbox"
            label="화장지가 구비되어 있습니다."
            checked={paperChecked}
            onChange={handlePaperChange}
          />
        </CheckboxContainer>
      </ToiletRegisterInputContainer>
      <ButtonContainer>
        <GoToListButton onClick={() => navigate("/")}>돌아가기</GoToListButton>
        <ToiletRegisterButton onClick={handleToileRegistor}>
          <StyledFaCoins />
          화장실 등록하고 포인트 받기
        </ToiletRegisterButton>
      </ButtonContainer>
    </ToiletRegisterInfoContainer>
  );
}

export default ToiletRegisterInfo;
