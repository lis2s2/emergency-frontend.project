import { useSelector } from "react-redux";
import styled from "styled-components";

const OrderItemWarpper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #cdcdcd;
  width: 100%;
`;

const StyledImg = styled.img`
  width: 120px;
  height: 120px;
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
function OrderItem(props) {
  const {itemId} = props;
  const item = useSelector((state) =>
    state.cart.items.find((item) => item.no === itemId)
  );

  const formatter = new Intl.NumberFormat('ko-KR');

  if (!item) {
    return null;
  }

  return (
    <OrderItemWarpper>
      <StyledImg src={item.prodImgpath}/>
      <div>
        <ItemsTitle>{item.prodTitle}</ItemsTitle>
        <ItemsPrice>{formatter.format(item.prodPrice)}원 X {item.prodCount}개 = {formatter.format((item.prodPrice) * (item.prodCount))}원</ItemsPrice>
      </div>
    </OrderItemWarpper>
  );
};

export default OrderItem;