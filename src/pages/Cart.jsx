// import React, { useEffect, useState } from 'react';
// import styled from "styled-components";
// import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";
// import CartItem from "../component/CartItem";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { setCartItems,selectItem, selectAllItems} from '../features/cart/cartSlice';
// const CartWarpper = styled.div`
//   max-width: 1440px;
//   min-height: 820px;
//   margin: 0 auto;
//   padding: 40px 0;

//   .cartlist_warpper {
//     width: 100%;
//     display: flex;
//     margin: 20px;
//     justify-content: space-between;
    
//     .cartlist_warpper_left {
//       width: 635px;
//       border: 1px solid #fff;
//       padding: 8px 20px;
//       background: #FFFFFF;
//       border: 1px solid #928F8F;
//       border-radius: 16px;
//     }

//     .cartlist_warpper_right {
//       width: 500px;
//       /* height: 379px; */
//       background: #FFFFFF;
//       border: 1px solid #928F8F;
//       padding: 20px;
//       border-radius: 16px 16px 0 0;
      

//       .cartList_payment_info {
//         border-bottom: 2px solid black;
//         text-align: left;
//         font-size: 24px;
//         padding: 10px 0px 30px;
//         font-weight: 700;
//       }
      
//       .total_product_amount {
//         display: flex;
//         justify-content: space-between;
//         font-size: 20px;
//         padding: 50px 0px 20px;
//         border-bottom: 1px solid #928F8F;
//         color: #928F8F;
//         font-weight: 500;
//       }

//       .total_payment_amount {
//         display: flex;
//         justify-content: space-between;
//         padding: 30px 0px;
//         align-items: center;

//         .total_payment_amount_left {
//           font-size: 20px;
//         }

//         .total_payment_amount_right {
//           font-size: 28px;
//         }
//       }
//     }
//   }

//   .cartlist_btn_group {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     border-bottom: 2px solid black;
//     /* width: 50px; */
//     height: 50px;

//     .cartlist_btn_group_left {
//       display: flex;
      
//       .cursor-pointer {
//         justify-content: center;
//         align-items: center;
//         display: flex;

//         .select_all_btn {
//           font-weight: 900;
//           font-size: 22px;
//           margin-left: 16px;
//         }
//       }

//     }
//     .cartlist_btn_group_right {
//       display: flex;

//       .btn_group {
//         font-size: 22px;
//         margin: 15px;
//         font-weight: 300;
//       }

//       .cursor-pointer::before {
//         content: "";
//         display: block;
//         width: 1px;
//         height: 26px;
//         background-color: #cccccc;
//         position: absolute;
//         right: 1040px;
//       }
//       .cursor-pointer:first-child::before {
//         display: none;
//       }
//     }
//   }
// `;


// const Title = styled.div`
//   font-weight: 700;
//   font-size: 36px;
//   line-height: 42px;
//   color: #FFFFFF;
//   width: 1200px;
//   text-align: start;
//   padding: 0 30px;
//   `;

// const StyledCheckbox = styled(IoIosCheckbox)`
//   width: 35px;
//   height: 35px;
//   color: #5FB393;
//   `;

// const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
//   color: #5FB393;
//   width: 35px;
//   height: 35px;
// `;

// const ToShopBtn = styled.button`
//   margin-top: -1px;
//   width: 250px;
//   border: 1px solid #928F8F;
//   padding: 20px 0;
//   background-color: #fff;
//   color: #928F8F;
//   border-radius: 0 0 0 16px;
// `;

// const ToPaymentBtn = styled.button`
//   margin-top: -1px;
//   width: 250px;
//   border: 1px solid #928F8F;
//   padding: 20px 0;
//   background-color: #000;
//   color: #fff;
//   border-radius: 0 0 16px 0;
// `;



// function Cart() {
//   const [isChecked, setIsChecked] = useState(false);
//   const cartList = useSelector((state) => state.cart.items);
//   const selectedItems = useSelector((state) => state.cart.selectedItems);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const memId = JSON.parse(localStorage.getItem("member")).memId;
//   const token = localStorage.getItem("token");

//   const handleCheck = () => {
//     setIsChecked(!isChecked);
//     dispatch(selectAllItems());
//   };

//   const handleItemCheck = (cartNo) => {
//     dispatch(selectItem(cartNo));
//   };

//   useEffect(() => {
//     const fetchCartList = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`, {
//           headers: {
//             Authorization: token,
//           }
//         });
//         dispatch(setCartItems(response.data));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCartList();
//   }, [dispatch, memId, token]);

//   const onUpdateCount = (cartNo, newCount) => {
//     const updatedCartList = cartList.map(item =>
//       item.cartNo === cartNo ? { ...item, prodCount: newCount } : item
//     );
//     dispatch(setCartItems(updatedCartList));
//   };

//   const deleteAllCart = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/carts/deleteAll?memberMemId=${memId}`, {
//         headers: {
//           Authorization: token,
//         }
//       });
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`, {
//         headers: {
//           Authorization: token,
//         }
//       });
//       dispatch(setCartItems(response.data));
//     } catch (error) {
//       console.error('장바구니 전체 삭제 실패:', error);
//     }
//   };

//   const totalProductAmount = cartList.reduce((total, item) => total + item.prodPrice * item.prodCount, 0);
//   const totalPaymentAmount = cartList.reduce((total, item) => {
//     return selectedItems.includes(item.no) ? total + item.prodPrice * item.prodCount : total;
//   }, 0);

//   const navigateToOrder = () => {
//     navigate('/order', { state: { selectedItems } });
//   };

//   return (
//     <CartWarpper>
//       <Title>장바구니</Title>
//       <div className="cartlist_warpper">
//         <div className="cartlist_warpper_left">
//           {/* 체크박스, 전체 선택 */}
//           <div className="cartlist_btn_group">
//             <div className="cartlist_btn_group_left">
//               <label className="cursor-pointer" onClick={handleCheck}>
//                 {isChecked ? <StyledCheckbox /> : <StyledOutlinCheckbox />}
//                 <p className="select_all_btn">{isChecked ? '전체해제' : '전체선택'}</p>
//               </label>
//             </div>
//             <div className="cartlist_btn_group_right">
//               <div className="btn_group cursor-pointer">선택 삭제</div>
//               <div className="btn_group cursor-pointer" onClick={deleteAllCart}>전체 삭제</div>
//             </div>
//           </div>
//           {cartList && cartList.length > 0 && cartList.map((cartitem) => {
//             return (
//               <CartItem
//                 key={cartitem.no}
//                 cartitem={cartitem}
//                 isChecked={selectedItems.includes(cartitem.no)}
//                 onUpdateCount={onUpdateCount}
//                 cartList={cartList}
//                 setCartList={setCartItems}
//                 onCheck={() => handleItemCheck(cartitem.no)}
//               />
//             );
//           })}
//         </div>
//         <div>
//           <div className="cartlist_warpper_right">
//             <div className="cartList_payment_info">결제 정보</div>
//             <div className="total_product_amount">
//               <p>총 상품 금액</p>
//               <p>{totalProductAmount.toLocaleString()}원</p>
//             </div>
//             <div className="total_payment_amount">
//               <p className="total_payment_amount_left">총 결제 금액</p>
//               <p className="total_payment_amount_right">{totalPaymentAmount.toLocaleString()}원</p>
//             </div>
//           </div>
//           <ToShopBtn onClick={() => navigate('/shop')}>쇼핑하기</ToShopBtn>
//           <ToPaymentBtn onClick={navigateToOrder}>주문하기</ToPaymentBtn>
//         </div>
//       </div>
//     </CartWarpper>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";
import CartItem from "../component/CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, selectItem, selectAllItems } from '../features/cart/cartSlice';

const CartWarpper = styled.div`
  max-width: 1440px;
  min-height: 820px;
  margin: 0 auto;
  padding: 40px 0;
  .cartlist_warpper {
    width: 100%;
    display: flex;
    margin: 20px;
    justify-content: space-between;
    .cartlist_warpper_left {
      width: 635px;
      border: 1px solid #fff;
      padding: 8px 20px;
      background: #FFFFFF;
      border: 1px solid #928F8F;
      border-radius: 16px;
    }
    .cartlist_warpper_right {
      width: 500px;
      background: #FFFFFF;
      border: 1px solid #928F8F;
      padding: 20px;
      border-radius: 16px 16px 0 0;
      .cartList_payment_info {
        border-bottom: 2px solid black;
        text-align: left;
        font-size: 24px;
        padding: 10px 0px 30px;
        font-weight: 700;
      }
      .total_product_amount {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        padding: 50px 0px 20px;
        border-bottom: 1px solid #928F8F;
        color: #928F8F;
        font-weight: 500;
      }
      .total_payment_amount {
        display: flex;
        justify-content: space-between;
        padding: 30px 0px;
        align-items: center;
        .total_payment_amount_left {
          font-size: 20px;
        }
        .total_payment_amount_right {
          font-size: 28px;
        }
      }
    }
  }
  .cartlist_btn_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
    height: 50px;
    .cartlist_btn_group_left {
      display: flex;
      .cursor-pointer {
        justify-content: center;
        align-items: center;
        display: flex;
        .select_all_btn {
          font-weight: 900;
          font-size: 22px;
          margin-left: 16px;
        }
      }
    }
    .cartlist_btn_group_right {
      display: flex;
      .btn_group {
        font-size: 22px;
        margin: 15px;
        font-weight: 300;
      }
      .cursor-pointer::before {
        content: "";
        display: block;
        width: 1px;
        height: 26px;
        background-color: #cccccc;
        position: absolute;
        right: 1040px;
      }
      .cursor-pointer:first-child::before {
        display: none;
      }
    }
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  color: #FFFFFF;
  width: 1200px;
  text-align: start;
  padding: 0 30px;
`;

const StyledCheckbox = styled(IoIosCheckbox)`
  width: 35px;
  height: 35px;
  color: #5FB393;
`;

const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
  color: #5FB393;
  width: 35px;
  height: 35px;
`;

const ToShopBtn = styled.button`
  margin-top: -1px;
  width: 250px;
  border: 1px solid #928F8F;
  padding: 20px 0;
  background-color: #fff;
  color: #928F8F;
  border-radius: 0 0 0 16px;
`;

const ToPaymentBtn = styled.button`
  margin-top: -1px;
  width: 250px;
  border: 1px solid #928F8F;
  padding: 20px 0;
  background-color: #000;
  color: #fff;
  border-radius: 0 0 16px 0;
`;

function Cart() {
  const [isChecked, setIsChecked] = useState(false);
  const [localCartList, setLocalCartList] = useState([]);
  const cartList = useSelector((state) => state.cart.items);
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const memId = JSON.parse(localStorage.getItem("member")).memId;
  const token = localStorage.getItem("token");

  const handleCheck = () => {
    setIsChecked(!isChecked);
    dispatch(selectAllItems());
  };

  const handleItemCheck = (cartNo) => {
    dispatch(selectItem(cartNo));
  };

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`, {
          headers: {
            Authorization: token,
          }
        });
        dispatch(setCartItems(response.data));
        setLocalCartList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartList();
  }, []);

  const onUpdateCount = (cartNo, newCount) => {
    const updatedCartList = localCartList.map(item =>
      item.no === cartNo ? { ...item, prodCount: newCount } : item
    );
    setLocalCartList(updatedCartList);
    dispatch(setCartItems(updatedCartList));
  };

  const deleteAllCart = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/carts/deleteAll?memberMemId=${memId}`, {
        headers: {
          Authorization: token,
        }
      });
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`, {
        headers: {
          Authorization: token,
        }
      });
      dispatch(setCartItems(response.data));
      setLocalCartList(response.data);
    } catch (error) {
      console.error('장바구니 전체 삭제 실패:', error);
    }
  };

  const totalProductAmount = cartList.reduce((total, item) => total + item.prodPrice * item.prodCount, 0);
  const totalPaymentAmount = cartList.reduce((total, item) => {
    return selectedItems.includes(item.no) ? total + item.prodPrice * item.prodCount : total;
  }, 0);

  const navigateToOrder = () => {
    navigate('/order', { state: { selectedItems } });
  };

  return (
    <CartWarpper>
      <Title>장바구니</Title>
      <div className="cartlist_warpper">
        <div className="cartlist_warpper_left">
          <div className="cartlist_btn_group">
            <div className="cartlist_btn_group_left">
              <label className="cursor-pointer" onClick={handleCheck}>
                {isChecked ? <StyledCheckbox /> : <StyledOutlinCheckbox />}
                <p className="select_all_btn">{isChecked ? '전체해제' : '전체선택'}</p>
              </label>
            </div>
            <div className="cartlist_btn_group_right">
              <div className="btn_group cursor-pointer">선택 삭제</div>
              <div className="btn_group cursor-pointer" onClick={deleteAllCart}>전체 삭제</div>
            </div>
          </div>
          {cartList && cartList.length > 0 && cartList.map((cartitem) => {
            return (
              <CartItem
                key={cartitem.no}
                cartitem={cartitem}
                isChecked={selectedItems.includes(cartitem.no)}
                onUpdateCount={onUpdateCount}
                cartList={cartList}
                setCartList={setCartItems}
                onCheck={() => handleItemCheck(cartitem.no)}
              />
            );
          })}
        </div>
        <div>
          <div className="cartlist_warpper_right">
            <div className="cartList_payment_info">결제 정보</div>
            <div className="total_product_amount">
              <p>총 상품 금액</p>
              <p>{totalProductAmount.toLocaleString()}원</p>
            </div>
            <div className="total_payment_amount">
              <p className="total_payment_amount_left">총 결제 금액</p>
              <p className="total_payment_amount_right">{totalPaymentAmount.toLocaleString()}원</p>
            </div>
          </div>
          <ToShopBtn onClick={() => navigate('/shop')}>쇼핑하기</ToShopBtn>
          <ToPaymentBtn onClick={navigateToOrder}>주문하기</ToPaymentBtn>
        </div>
      </div>
    </CartWarpper>
  );
}

export default Cart;