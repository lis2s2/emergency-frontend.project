import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import styled from "styled-components";
import OrderItem from "../component/OrderItem";
import axios from "axios";

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
  text-align: right;
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
  const member = JSON.parse(localStorage.getItem("member"));

  const selectedItems = useSelector(state => state.cart.selectedItems);
  const cartList = useSelector(state => state.cart.items);
  const orderItems = cartList.filter(item => selectedItems.includes(item.no));
  const memId = JSON.parse(localStorage.getItem("member")).memId;
  const token = localStorage.getItem("token");

  const formatter = new Intl.NumberFormat('ko-KR');

  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerId: memId,
    totalAmount: orderItems.reduce((total, item) => total + item.prodPrice * item.prodCount, 0),
    usedPoint: 0,
    address: getFullAddress,
    phoneNum: '',
    detailedAddress: '',
    postalCode: postCode,
    orderItems: orderItems.map(item => ({
      productNo: item.prodNo,
      count: item.prodCount,
      productPrice: item.prodPrice,
      totalPrice: item.prodPrice * item.prodCount,
    })),
  });

  useEffect(() => {
    setNewOrder(prevState => ({
      ...prevState,
      totalAmount: orderItems.reduce((total, item) => total + item.prodPrice * item.prodCount, 0),
      orderItems: orderItems.map(item => ({
        productNo: item.prodNo,
        count: item.prodCount,
        productPrice: item.prodPrice,
        totalPrice: item.prodPrice * item.prodCount,
      }))
    }));
  }, []);


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
    setNewOrder(prevState => ({
      ...prevState,
      address: fullAddress,
      postalCode: zonecode
    }));
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        ...newOrder,
        orderItems: newOrder.orderItems.filter(item => item.productNo > 0)
      };

      const response = await axios.post('http://localhost:8080/orders', orderData, {
        headers: {
          Authorization: token,
        }
      });
      console.log('주문이 추가되었습니다:', response.data);
       // 주문이 성공적으로 추가된 후 장바구니 항목의 is_deleted 업데이트
      await axios.put('http://localhost:8080/carts/deleteSelected', selectedItems, {
        headers: {
          Authorization: token,
        }
      });
      console.log('장바구니 항목이 업데이트되었습니다.');
      
    } catch (error) {
      console.error('주문을 추가하는 중 에러발생!:', error);
    }
  };

  return (
    <OrderWrapper>
      <Container>
        <div>
          <Title>배송지</Title>
          <DeliveryAddress>
            <InputGroup>
              <Label>수령인</Label>
              <StyledInput 
                type="text" 
                placeholder="홍길동" 
                name="customerName"
                value={newOrder.customerName}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>연락처</Label>
              <StyledInput 
                type="text" 
                placeholder="숫자만 입력" 
                name="phoneNum"
                value={newOrder.phoneNum}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>배송지</Label>
              <StyledPostInput 
                type="text" 
                placeholder="우편번호" 
                value={postCode} 
                readOnly 
              />
              <FindAddress type='button' onClick={handleClick}>우편번호 검색</FindAddress>
            </InputGroup>
            <InputGroup>
              <Label>주소</Label>
              <StyledInput 
                type="text" 
                placeholder="주소" 
                value={getFullAddress} 
                readOnly 
              />
            </InputGroup>
            <InputGroup>
              <Label>상세주소</Label>
              <StyledInput 
                type="text" 
                placeholder="상세주소" 
                name="detailedAddress"
                value={newOrder.detailedAddress}
                onChange={handleChange}
              />
            </InputGroup>
          </DeliveryAddress>

          <Title>주문상품</Title>
          <OrderedProduct>
            {selectedItems.map(itemId => (
              // <OrderItem key={item.no} item={item} />
              <OrderItem key={itemId} itemId={itemId} />
            ))}
          </OrderedProduct>
        </div>

        <div>
          <Title>결제 상세</Title>
          <PaymentInfo>
            <InfoRow>
              <InfoLabel>포인트</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoLabel>보유 포인트:</InfoLabel>
              <InfoValue>{formatter.format(member.memPoint)}p</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용 포인트:</InfoLabel>
              <InfoValue>
                <InfoInput 
                  type="text" 
                  name="usedPoint"
                  value={newOrder.usedPoint}
                  onChange={handleChange}
                />p
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>최종 결제 금액:</InfoLabel>
              <InfoValue>{formatter.format(newOrder.totalAmount - newOrder.usedPoint)}원</InfoValue>
            </InfoRow>
            <button onClick={handleSubmit}>{formatter.format(newOrder.totalAmount - newOrder.usedPoint)}원 결제하기</button>
          </PaymentInfo>
        </div>
      </Container>
    </OrderWrapper>
  );
}

export default Order;
