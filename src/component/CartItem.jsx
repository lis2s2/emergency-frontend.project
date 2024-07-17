import { IoCloseOutline } from "react-icons/io5";
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";
import styled from "styled-components";
import { useState } from "react";

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #cdcdcd;

  .btn_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 116px;
    height: 24px;
    border-radius: 4px;
    @media screen and (max-width: 480px) {
      width: 74px;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 100%;
    font-size: 24px;
    cursor: pointer;
  }

  .count_area {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    border: 1px solid black;
    font-size: 18px;
  }
`;

const CartItemImg = styled.img`
  width: 150px;
  height: 150px;
  @media screen and (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const StyledCheckbox = styled(IoIosCheckbox)`
  width: 35px;
  height: 35px;
  color: #5fb393;
  cursor: pointer;
`;

const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
  color: #5fb393;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const CartItemTitle = styled.div`
  width: 65px;
  font-weight: 700;
  font-size: 18px;
  line-height: 19px;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
  
`;

const CartItemPrice = styled.p`
  font-size: 20px;
  font-weight: 700;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const CloseBtn = styled(IoCloseOutline)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function CartItem(props) {
  const { isChecked, cartitem, onUpdateCount, onCheck, handleDeleteCartItem } = props;
  const [count, setCount] = useState(cartitem.prodCount);

  const formatter = new Intl.NumberFormat('ko-KR');

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      onUpdateCount(cartitem.no, count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
    onUpdateCount(cartitem.no, count + 1);
  };

  return (
    <CartItemWrapper>
      {isChecked ? <StyledCheckbox onClick={onCheck} /> : <StyledOutlinCheckbox onClick={onCheck} />}
      <CartItemImg src={cartitem.prodImgpath} />
      <CartItemTitle>{cartitem.prodTitle}</CartItemTitle>
      <div className="btn_wrapper">
        <button type="button" className="btn" onClick={handleDecrease}>-</button>
        <div className="count_area">{cartitem.prodCount}</div>
        <button type="button" className="btn" onClick={handleIncrease}>+</button>
      </div>
      <CartItemPrice>{formatter.format(cartitem.prodPrice * cartitem.prodCount)}원</CartItemPrice>
      <CloseBtn onClick={() => handleDeleteCartItem(cartitem.no)} />
    </CartItemWrapper>
  );
}

export default CartItem;
