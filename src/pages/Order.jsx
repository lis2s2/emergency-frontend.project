import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import styled from "styled-components";
import OrderItem from "../component/OrderItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderWrapper = styled.div`
  width: 1440px;
  min-height: 820px;
  padding: 20px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1280px) {
    max-width: 100%;
  }
  @media screen and (max-width: 480px) {
    max-width: 100%;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  @media screen and (max-width: 1280px) {
    max-width: 100%;
    display: block;
  }
  
  @media screen and (max-width: 480px) {
    max-width: 100%;
    display: block;
  }

  .box_container {
    max-width: 100%;
  }
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 32px;
  text-align: left;
  color: #FFFFFF;
  margin-bottom: 10px;
  width: 100%;

  @media screen and (max-width: 1280px) {
    text-align: center;
  }

  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;
const DeliveryAddress = styled.div`
  width: 650px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  @media screen and (max-width: 1280px) {
    max-width: 100%;
    margin: 15px auto;
  }
  
  @media screen and (max-width: 480px) {
    max-width: 100%;
    margin: 15px auto;
    padding: 20px 5px;
  }
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
  @media screen and (max-width: 480px) {
    width: 65px;
  }
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

  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;
const PaymentInfo = styled.div`
  width: 650px;
  min-height: 200px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 10px;
  margin: 15px auto;
  @media screen and (max-width: 1280px) {
    max-width: 100%;
    margin: 15px auto;
  }

  @media screen and (max-width: 480px) {
    max-width: 100%;
    margin: 15px auto;
  }
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
  width: 650px;
  min-height: 300px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  @media screen and (max-width: 1280px) {
    max-width: 100%;
    min-height: 200px;
    margin: 15px auto;
  }
  
  @media screen and (max-width: 480px) {
    max-width: 100%;
    min-height: 200px;
    margin: 15px auto;
  }
  
`;
const PayBtn = styled.div`
  margin-top: 40px;
  height: 60px;
  background: #5FB393;
  border-radius: 8px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
  transition: 0.2s background ease-in;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #157347;

    .total {
      color: #7be6bd;
    }
  }
  
  .total {
    color: #003d17;
    font-weight: 700;
    transition: 0.2s color ease-in;
  }
`;

function Order() {
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const [getFullAddress, setGetFullAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const navigate = useNavigate();
  
  const selectedItems = useSelector(state => state.cart.selectedItems);
  const cartList = useSelector(state => state.cart.items);
  const orderItems = cartList.filter(item => selectedItems.includes(item.no));


  const token = localStorage.getItem("token");
  const member = JSON.parse(localStorage.getItem("member"));
  const memId = member.memId;

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
    setGetFullAddress(fullAddress);
    setPostCode(zonecode);
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
    if (name === 'usedPoint') {
      const usedPoint = parseInt(value, 10);
      if (usedPoint > member.memPoint) {
        setNewOrder(prevState => ({
          ...prevState,
          [name]: member.memPoint.toString() 
        }));
        alert("사용 포인트가 보유 포인트보다 많습니다. 보유 포인트로 설정되었습니다.");
        return;
      }
    }
  
    setNewOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const handleSubmit = () => {
    if (!newOrder.customerName || !newOrder.phoneNum || !newOrder.detailedAddress || !getFullAddress) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!window.IMP) return;
    const { IMP } = window;
    IMP.init(`${process.env.REACT_APP_PORT_ONE_KEY}`); // 가맹점 식별코드

    const data = {
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: (newOrder.totalAmount - newOrder.usedPoint),
      name: "아임포트 결제 데이터 분석",
      buyer_name: newOrder.customerName,
      buyer_tel: newOrder.phoneNum,
      buyer_email: member.memEmail,
      buyer_addr: getFullAddress,
      buyer_postcode: postCode,
    };

    IMP.request_pay(data, paymentCallback);
  };

  const paymentCallback = async (response) => {
    const { success, error_msg } = response;
    if (success) {
      try {
        const orderData = {
          ...newOrder,
          orderItems: newOrder.orderItems.filter(item => item.productNo > 0)
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/orders`, orderData, {
          headers: {
            Authorization: token,
          }
        });
        await axios.put(`${process.env.REACT_APP_API_URL}/carts/deleteSelected`, selectedItems, {
          headers: {
            Authorization: token,
          }
        });
        alert('결제가 완료되었습니다.');
        member.memPoint -= newOrder.usedPoint;
        localStorage.setItem("member", JSON.stringify(member));
        navigate('/shop');
      } catch (error) {
        console.error('주문을 추가하는 중 에러발생!:', error);
        alert('주문 처리 중 오류가 발생했습니다.');
      }
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };


  return (
    <OrderWrapper>
      <Container>
        <div className="box_container">
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
              <OrderItem key={itemId} itemId={itemId} />
            ))}
          </OrderedProduct>
        </div>

        <div className="box_container">
          <Title>결제 상세</Title>
          <PaymentInfo>
            <InfoRow>
              <InfoLabel>포인트</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoLabel>보유 포인트</InfoLabel>
              <InfoValue>{formatter.format(member.memPoint)}p</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용 포인트</InfoLabel>
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
              <InfoLabel>최종 결제 금액</InfoLabel>
              <InfoValue>{formatter.format(newOrder.totalAmount - newOrder.usedPoint)}원</InfoValue>
            </InfoRow>
            <PayBtn onClick={handleSubmit}><span className="total">{formatter.format(newOrder.totalAmount - newOrder.usedPoint)}</span>원 결제하기</PayBtn>
          </PaymentInfo>
        </div>
      </Container>
    </OrderWrapper>
  );
}

export default Order;
