import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ItemWrapper = styled.div`
  width: 250px;
  height: 400px;
  margin-left: 50px;
  margin-top: 40px;
  display: block;
`;

const ItemTitle = styled.h4`
  font-weight: 400;
  font-size: 18px;
  color: #4D4D4D;
  text-align: left;
  margin-bottom: 20px;
`;

const ItemPrice = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #000;
  text-align: left;
`;


function ShopItem(props) {
  const { item } = props;

  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat('ko-KR');

  return (
    <ItemWrapper className="cursor-pointer">
      <img src={item.imgpath} alt={item.title} width="100%" height="75%" onClick={() => navigate(`detail/${item.no}`)}/>
      <ItemTitle>{item.title}</ItemTitle>
      <ItemPrice>{formatter.format( item.price)}원</ItemPrice>
    </ItemWrapper>
  );
};

export default ShopItem;