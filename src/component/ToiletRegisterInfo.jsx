import { Form } from "react-bootstrap";
import styled from "styled-components";

const ToiletRegisterInfoContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
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

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: 400;
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

function ToiletRegisterInfo(props) {
  const { address } = props;

  return (
    <ToiletRegisterInfoContainer>
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
          value={address && address}
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
          placeholder="건물 층수 및 화장실 위치"
        />
      </InputContainer>
      <InputContainer className="mb-3">
        <StyledLabel htmlFor="default-checkbox" className="form-label">
          
          <Form.Check // prettier-ignore
            type="checkbox"
            id="default-checkbox"
            label="default-checkbox"
          />

        </StyledLabel>
      </InputContainer>
    </ToiletRegisterInfoContainer>
  );
}

export default ToiletRegisterInfo;
