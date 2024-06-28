import styled from "styled-components";
import { TbRoadSign } from "react-icons/tb";
import { PiStarFill } from "react-icons/pi";

const { kakao } = window;

const ListItemWrapper = styled.div`
  padding: 10px;
  height: 108px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
`;

const ListItemInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const ListItemButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;

const ListItemScoreAddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ListItemScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SearchButton = styled.button`
  padding: 0 12px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #050505;
  color: #ffffff;
  font-weight: 600;
  height: 36px;
  width: 100px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
  padding: 0 12px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #050505;
  color: #ffffff;
  font-weight: 600;
  height: 36px;
  width: 100px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledTbRoadSign = styled(TbRoadSign)`
  height: 22px;
  width: 22px;
`;

const StyledPiStarFill = styled(PiStarFill)`
  color: #F6C002;
  height: 16px;
  width: 16px;
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

function ToiletListItem() {
  return (
    <ListItemWrapper>
      <ListItemInfoContainer>
        <StyledTitle>제목</StyledTitle>
        <ListItemScoreAddressContainer>
          <ListItemScoreContainer>
            <StyledPiStarFill />
            <StyledContent>4.8</StyledContent>
          </ListItemScoreContainer>
          <StyledContent>주소</StyledContent>
        </ListItemScoreAddressContainer>
        <StyledContent>남자화장실</StyledContent>
      </ListItemInfoContainer>
      <ListItemButtonContainer>
        <SearchButton>
          <StyledTbRoadSign />
          길찾기
        </SearchButton>
        <DetailButton>상세 정보</DetailButton>
      </ListItemButtonContainer>
    </ListItemWrapper>
  );
}

export default ToiletListItem;
