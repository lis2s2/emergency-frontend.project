import styled from "styled-components";

const OrderItemWarpper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #cdcdcd;
  width: 100%;
`;

const StyledImg = styled.div`
  width: 120px;
  height: 120px;
  background-color: #dcdcdc;
  margin-right: 10px;
`;

const ItemsTitle = styled.p`
  font-weight: 500;
  padding: 10px;
  text-align: left;
  `;


const ItemsPrice = styled.p`
  font-weight: 700;
  padding: 10px;
  text-align: left;
  font-size: 20px;
`;
function OrderItem() {
  return (
    <OrderItemWarpper>
      <StyledImg/>
      <div>
        <ItemsTitle>이름이 뭐더라 암튼 엄청 길었던 아이템 이름</ItemsTitle>
        <ItemsPrice>5,000원</ItemsPrice>
      </div>
    </OrderItemWarpper>
  );
};

export default OrderItem;