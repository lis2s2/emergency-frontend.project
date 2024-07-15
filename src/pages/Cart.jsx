// import React, { useEffect, useState } from 'react';
// import styled from "styled-components";
// import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";
// import CartItem from "../component/CartItem";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { setCartItems, selectItem, selectAllItems } from '../features/cart/cartSlice';

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
//       background: #ffffff;
//       border: 1px solid #928f8f;
//       border-radius: 16px;
//     }
//     .cartlist_warpper_right {
//       width: 500px;
//       background: #ffffff;
//       border: 1px solid #928f8f;
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
//         border-bottom: 1px solid #928f8f;
//         color: #928f8f;
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
//   color: #ffffff;
//   width: 1200px;
//   text-align: start;
//   padding: 0 30px;
// `;

// const StyledCheckbox = styled(IoIosCheckbox)`
//   width: 35px;
//   height: 35px;
//   color: #5fb393;
// `;

// const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
//   color: #5fb393;
//   width: 35px;
//   height: 35px;
// `;

// const ToShopBtn = styled.button`
//   margin-top: -1px;
//   width: 250px;
//   border: 1px solid #928f8f;
//   padding: 20px 0;
//   background-color: #fff;
//   color: #928f8f;
//   border-radius: 0 0 0 16px;
// `;

// const ToPaymentBtn = styled.button`
//   margin-top: -1px;
//   width: 250px;
//   border: 1px solid #928f8f;
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
//           },
//         });
//         dispatch(setCartItems(response.data));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCartList();
//   }, [dispatch, memId, token]);

//   const onUpdateCount = async (cartNo, newCount) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartNo}/updateCount?prodCount=${newCount}`);
//       dispatch(setCartItems(
//         cartList.map((item) => item.no === cartNo ? { ...item, prodCount: newCount } : item)
//       ));
//     } catch (error) {
//       console.error('장바구니 갯수를 업데이트 하는 중 오류:', error);
//     }
//   };

//   const handleDeleteCartItem = async (cartNo) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartNo}/delete`);
//       dispatch(setCartItems(cartList.filter((item) => item.no !== cartNo)));
//     } catch (error) {
//       console.error("장바구니 항목을 삭제하는 중 오류가 발생했습니다:", error);
//     }
//   };

//   const deleteAllCart = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/carts/deleteAll?memberMemId=${memId}`, {
//         headers: {
//           Authorization: token,
//         },
//       });
//       dispatch(setCartItems([]));
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
//                 handleDeleteCartItem={handleDeleteCartItem}
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
// }

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
      background: #ffffff;
      border: 1px solid #928f8f;
      border-radius: 16px;
    }
    .cartlist_warpper_right {
      width: 500px;
      background: #ffffff;
      border: 1px solid #928f8f;
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
        border-bottom: 1px solid #928f8f;
        color: #928f8f;
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
    }
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  color: #ffffff;
  width: 1200px;
  text-align: start;
  padding: 0 30px;
`;

const StyledCheckbox = styled(IoIosCheckbox)`
  width: 35px;
  height: 35px;
  color: #5fb393;
`;

const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
  color: #5fb393;
  width: 35px;
  height: 35px;
`;

const ToShopBtn = styled.button`
  margin-top: -1px;
  width: 250px;
  border: 1px solid #928f8f;
  padding: 20px 0;
  background-color: #fff;
  color: #928f8f;
  border-radius: 0 0 0 16px;
`;

const ToPaymentBtn = styled.button`
  margin-top: -1px;
  width: 250px;
  border: 1px solid #928f8f;
  padding: 20px 0;
  background-color: #000;
  color: #fff;
  border-radius: 0 0 16px 0;
`;

function Cart() {
  const [isChecked, setIsChecked] = useState(false);
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
          },
        });
        dispatch(setCartItems(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartList();
  }, [dispatch, memId, token]);

  const onUpdateCount = async (cartNo, newCount) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartNo}/updateCount?prodCount=${newCount}`);
      dispatch(setCartItems(
        cartList.map((item) => item.no === cartNo ? { ...item, prodCount: newCount } : item)
      ));
    } catch (error) {
      console.error('장바구니 갯수를 업데이트 하는 중 오류:', error);
    }
  };

  const handleDeleteCartItem = async (cartNo) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartNo}/delete`);
      dispatch(setCartItems(cartList.filter((item) => item.no !== cartNo)));
    } catch (error) {
      console.error("장바구니 항목을 삭제하는 중 오류가 발생했습니다:", error);
    }
  };

  const deleteAllCart = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/carts/deleteAll?memberMemId=${memId}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(setCartItems([]));
    } catch (error) {
      console.error('장바구니 전체 삭제 실패:', error);
    }
  };

  const deleteSelectedItems = async () => {
    try {
      // 선택된 항목들 삭제
      for (const cartNo of selectedItems) {
        await axios.put(`${process.env.REACT_APP_API_URL}/carts/${cartNo}/delete`);
      }
      // 삭제된 항목을 제외한 새로운 장바구니 목록 업데이트
      dispatch(setCartItems(cartList.filter((item) => !selectedItems.includes(item.no))));
    } catch (error) {
      console.error('선택된 항목들을 삭제하는 중 오류:', error);
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
              <div className="btn_group cursor-pointer" onClick={deleteSelectedItems}>선택 삭제</div>
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
                handleDeleteCartItem={handleDeleteCartItem}
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
