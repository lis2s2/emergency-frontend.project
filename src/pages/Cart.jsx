import styled  from "styled-components";
import { IoIosCheckbox,IoIosCheckboxOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import CartItem from "../component/CartItem";
import axios from "axios";


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
    }

    .cartlist_warpper_right {
      width: 500px;
      /* height: 379px; */
      background: #FFFFFF;
      border: 1px solid #928F8F;
      padding: 20px;

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
    /* width: 50px; */
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
  
`;

const ToPaymentBtn = styled.button`
  margin-top: -1px;
  width: 250px;
  border: 1px solid #928F8F;
  padding: 20px 0;
  background-color: #000;
  color: #fff;
  
`;





function Cart() {
  const [isChecked, setIsChecked] = useState(false);
  const [cartList, setCartList] = useState([]);
  
  const [selectedItems, setSelectedItems] = useState([]);
  

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const memId = JSON.parse(localStorage.getItem("member")).memId;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/carts?id=${memId}`);
        setCartList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCartList();
  }, []);


  const onUpdateCount = (cartNo, newCount) => {
    const updatedCartList = cartList.map(item =>
      item.cartNo === cartNo ? { ...item, prodCount: newCount } : item
    );
    setCartList(updatedCartList);
  };



  return (
    <CartWarpper>
      <Title>장바구니</Title>
      <div className="cartlist_warpper">
        <div className="cartlist_warpper_left">

          {/* 체크박스, 전체 선택 */}
          <div className="cartlist_btn_group">
            <div className="cartlist_btn_group_left">
              <label className="cursor-pointer" onClick={handleCheck}>
                {isChecked ? <StyledCheckbox /> : <StyledOutlinCheckbox />}
                <p className="select_all_btn">{isChecked? '전체해체': '전체선택'}</p>
              </label>
            </div>
            <div className="cartlist_btn_group_right">
              <div className="btn_group cursor-pointer">선택 삭제</div>
              <div className="btn_group cursor-pointer">전체 삭제</div>
            </div>
          </div>

          {cartList && cartList.length > 0 && cartList.map((cartitem) => {
            return (
              <CartItem 
                key={cartitem.no} 
                cartitem={cartitem} 
                isChecked={isChecked}
                onUpdateCount={onUpdateCount}
                cartList={cartList}
                setCartList={setCartList}
              />
            );
          })}
        </div>
        
        <div>
          <div className="cartlist_warpper_right">
            <div className="cartList_payment_info">결제 정보</div>
            <div className="total_product_amount">
              <p>총 상품 금액</p>
              <p>20,000원</p>
            </div>
            
            <div className="total_payment_amount">
              <p className="total_payment_amount_left">총 결제 금액</p>
              <p className="total_payment_amount_right">20,000원</p>
            </div>
          </div>
            <ToShopBtn>쇼핑하기</ToShopBtn>
            <ToPaymentBtn>주문하기</ToPaymentBtn>
          </div>
      </div>
    </CartWarpper>
  );
};

export default Cart;