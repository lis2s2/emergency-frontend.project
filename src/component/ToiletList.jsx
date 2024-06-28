import styled from "styled-components";
import { MdTune } from "react-icons/md";
import ToiletListItem from "./ToiletListItem";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;


const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 18px;
  border: 1px solid #3E4958;
  background-color: white;
  color: #3E4958;
  font-weight: 600;
  &:hover {
    background-color: #3E4958;
    color: white; 
  }
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
  `;

  




function ToiletList() {
  return (
    <>
      <ButtonContainer>
        <ToggleButton>주유소</ToggleButton>
        <ToggleButton>대형 까페</ToggleButton>
        <ToggleButton>사용자 등록 화장실</ToggleButton>
        <StyledMdTune />
      </ButtonContainer>
      <ListContainer>
        <ToiletListItem />
      </ListContainer>
    </>
  );
};

export default ToiletList;