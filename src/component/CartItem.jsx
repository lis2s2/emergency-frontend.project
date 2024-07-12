// import { IoCloseOutline } from "react-icons/io5";
// import { IoIosCheckbox,IoIosCheckboxOutline } from "react-icons/io";
// import styled from "styled-components";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CartItemWrapper = styled.div`

// display: flex;
// justify-content: space-between;
// align-items: center;
// padding: 15px 0;
// border-bottom: 1px solid #cdcdcd;

//   .btn_wrapper {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 1px solid black;
//     width: 116px;
//     height: 24px;
//     border-radius: 4px;
//   }

//   .btn {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 30px;
//     height: 100%;
//     font-size: 24px;
//     cursor: pointer;
//   }

//   .count_area {
//     flex: 2;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 24px;
//     border: 1px solid black;
//     font-size: 18px;
//   }
// `;

// const CartItemImg = styled.img`
//   width: 150px;
//   height: 150px;
// `;

// const StyledCheckbox = styled(IoIosCheckbox)`
//   width: 35px;
//   height: 35px;
//   color: #5FB393;
//   cursor: pointer;
// `;

// const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
//   color: #5FB393;
//   width: 35px;
//   height: 35px;
//   cursor: pointer;
// `;

// const CartItemTitle = styled.div`
//   width: 65px;
//   font-weight: 700;
//   font-size: 18px;
//   line-height: 19px;
//   text-align: center;
// `;

// const CartItemPrice = styled.p`
//   font-size: 20px;
//   font-weight: 700;
// `;

// const CloseBtn = styled(IoCloseOutline)`
//   width: 30px;
//   height: 30px;
//   cursor: pointer;
// `;

// function CartItem(props) {
//   const { isChecked, cartitem, onUpdateCount, setCartList, cartList , onCheck} = props;
//   // const { isSelected, cartitem, onUpdateCount, setCartList, cartList} = props;

//   const [count, setCount] = useState(cartitem.prodCount);


//   const formatter = new Intl.NumberFormat('ko-KR');
//   const memId = JSON.parse(localStorage.getItem("member")).memId;


//   const handleDeleteCartItem = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartitem.no}/delete`);
//       setCartList(cartList.filter((item) => item.cartNo !== cartitem.no));
//       console.log("cartNo: " + cartitem.no);
  
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`);


//       setCartList(response.data);
//     } catch (error) {
//       console.error("장바구니 항목을 삭제하는 중 오류가 발생했습니다:", error);
//       console.log("cartNo: " + cartitem.no);
//     }
//   };

//   const updateCartCount = async (newCount) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartitem.no}/updateCount?prodCount=${newCount}`);
//       onUpdateCount(cartitem.no, newCount);
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`);
//       setCartList(response.data);
//     } catch (error) {
//       console.error('장바구니 갯수를 업데이트 하는 중 오류:', error);
//     }
//   };

//   const handleDecrease = () => {
//     if (count > 1) {
//       setCount(count - 1);
//       updateCartCount(count - 1);
//     }
//   };

//   const handleIncrease = () => {
//     setCount(count + 1);
//     updateCartCount(count + 1);
//   };



//   return (
//     <CartItemWrapper>
//       {isChecked ? <StyledCheckbox onClick={onCheck} /> : <StyledOutlinCheckbox onClick={onCheck}/>}
//         <CartItemImg src={cartitem.prodImgpath}/> 
//         <CartItemTitle>{cartitem.prodTitle}</CartItemTitle>
//       <div className="btn_wrapper">
//         <button type="button" className="btn" onClick={handleDecrease}>-</button>
//         <div className="count_area">{cartitem.prodCount}</div>
//         <button type="button" className="btn" onClick={handleIncrease}>+</button>
//       </div>
//       <CartItemPrice>{formatter.format(cartitem.prodPrice * cartitem.prodCount)}원</CartItemPrice>
//       <CloseBtn onClick={() => handleDeleteCartItem(cartitem.cartNo)}/>
//   </CartItemWrapper>
//   );
// };

// export default CartItem;  

import { IoCloseOutline } from "react-icons/io5";
import { IoIosCheckbox,IoIosCheckboxOutline } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
`;

const StyledCheckbox = styled(IoIosCheckbox)`
  width: 35px;
  height: 35px;
  color: #5FB393;
  cursor: pointer;
`;

const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
  color: #5FB393;
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
`;

const CartItemPrice = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const CloseBtn = styled(IoCloseOutline)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function CartItem(props) {
  const { isChecked, cartitem, onUpdateCount, setCartList, cartList , onCheck, localCartList} = props;
  // const { isSelected, cartitem, onUpdateCount, setCartList, cartList} = props;

  const [count, setCount] = useState(cartitem.prodCount);


  const formatter = new Intl.NumberFormat('ko-KR');
  const memId = JSON.parse(localStorage.getItem("member")).memId;


  const handleDeleteCartItem = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartitem.no}/delete`);
      setCartList(cartList.filter((item) => item.cartNo !== cartitem.no));
      console.log("cartNo: " + cartitem.no);
  
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`);


      setCartList(response.data);
    } catch (error) {
      console.error("장바구니 항목을 삭제하는 중 오류가 발생했습니다:", error);
      console.log("cartNo: " + cartitem.no);
    }
  };

  const updateCartCount = async (newCount) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartitem.no}/updateCount?prodCount=${newCount}`);
      onUpdateCount(cartitem.no, newCount);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`);
      setCartList(response.data);
      
    } catch (error) {
      console.error('장바구니 갯수를 업데이트 하는 중 오류:', error);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      updateCartCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
    updateCartCount(count + 1);
  };



  return (
    <CartItemWrapper>
      {isChecked ? <StyledCheckbox onClick={onCheck} /> : <StyledOutlinCheckbox onClick={onCheck}/>}
        <CartItemImg src={cartitem.prodImgpath}/> 
        <CartItemTitle>{cartitem.prodTitle}</CartItemTitle>
      <div className="btn_wrapper">
        <button type="button" className="btn" onClick={handleDecrease}>-</button>
        <div className="count_area">{cartitem.prodCount}</div>
        <button type="button" className="btn" onClick={handleIncrease}>+</button>
      </div>
      <CartItemPrice>{formatter.format(cartitem.prodPrice * cartitem.prodCount)}원</CartItemPrice>
      <CloseBtn onClick={() => handleDeleteCartItem(cartitem.cartNo)}/>
  </CartItemWrapper>
  );
};

export default CartItem;  