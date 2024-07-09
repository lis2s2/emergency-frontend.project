import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import styled from "styled-components";
import OrderItem from "../component/OrderItem";

const OrderWrapper = styled.div`
  min-width: 1440px;
  min-height: 820px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 32px;
  text-align: left;
  color: #FFFFFF;
  margin-bottom: 10px;
`;

const DeliveryAddress = styled.div`
  width: 700px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.span`
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 20px;
  color: #5FB393;
`;

const StyledInput = styled.input`
  border: 1px solid #5FB393;
  border-radius: 8px;
  width: calc(100% - 100px);
  padding: 8px;
  color: #157347;
  font-weight: 700;
  &:focus {
    outline: 1px solid #5FB393;
  }
  &::placeholder {
    color: #96b1a6;
  }
`;

const StyledPostInput = styled.input`
  border: 1px solid #5FB393;
  border-radius: 8px;
  width: 150px;
  margin-right: 20px;
  padding: 8px;
  color: #157347;
  font-weight: 700;
  &:focus {
    outline: 1px solid #5FB393;
  }
  &::placeholder {
    color: #96b1a6;
  }
`;

const FindAddress = styled.button`
  height: 40px;
  background-color: #5FB393;
  color: #fff;
  border: 1px solid #5FB393;
  border-radius: 8px;
  transition: 0.2s background ease-in;
  padding: 0 10px;

  &:hover {
    background-color: #157347;
    border: 1px solid #157347;
  }
`;

const PaymentInfo = styled.div`
  width: 650px;
  min-height: 200px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const InfoLabel = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: #5FB393;
`;

const InfoValue = styled.span`
  font-size: 24px;
  color: #157347;
  font-weight: 700;
`;

const InfoInput = styled.input`
  width: 100px;
  border: 1px solid #5FB393;
  border-radius: 8px;
  padding: 5px;
  text-align: ri;
  &:focus {
    outline: 1px solid #5FB393;
  }
`;

const OrderedProduct = styled.div`
  width: 700px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Order() {
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const [getFullAddress, setGetFullAddress] = useState('');
  const [postCode, setPostCode] = useState('');

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let zonecode = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setGetFullAddress(fullAddress)
    setPostCode(zonecode)
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <OrderWrapper>
      <Container>
        <div>
          <Title>배송지</Title>
          <DeliveryAddress>
            <InputGroup>
              <Label>수령인</Label>
              <StyledInput type="text" placeholder="홍길동" />
            </InputGroup>
            <InputGroup>
              <Label>연락처</Label>
              <StyledInput type="text" placeholder="숫자만 입력" />
            </InputGroup>
            <InputGroup>
              <Label>배송지</Label>
              <StyledPostInput type="text" placeholder="우편번호" value={postCode} readOnly />
              <FindAddress type='button' onClick={handleClick}>우편번호 검색</FindAddress>
            </InputGroup>
            <InputGroup>
              <Label>주소</Label>
              <StyledInput type="text" placeholder="주소" value={getFullAddress} readOnly />
            </InputGroup>
            <InputGroup>
              <Label>상세주소</Label>
              <StyledInput type="text" placeholder="상세주소" />
            </InputGroup>
          </DeliveryAddress>

          <Title>주문상품</Title>
          <OrderedProduct>
            {/* 맵돌리기 */}
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
          </OrderedProduct>
        </div>


        <div>
          <Title>결제 상세</Title>
          <PaymentInfo>
            {/* <p>포인트</p>
            <p>보유 포인트 : 500p</p>
            <span>사용 포인트:</span>
            <input type="text" />p

            
            <p>최종 결제 금액: 5,000원</p> */}
            <InfoRow>
              <InfoLabel>포인트</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoLabel>보유 포인트:</InfoLabel>
              <InfoValue>500p</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용 포인트:</InfoLabel>
              <InfoValue>
                <InfoInput type="text" />p
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>최종 결제 금액:</InfoLabel>
              <InfoValue>5,000원</InfoValue>
            </InfoRow>
          </PaymentInfo>
        </div>
      </Container>
    </OrderWrapper>
  );
}

export default Order;
