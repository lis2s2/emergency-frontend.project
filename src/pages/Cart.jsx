import styled  from "styled-components";

const CartWarpper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 0;

  .cartlist_warpper {
    width: 100%;
    display: flex;
    margin: 20px;
    justify-content: space-between;
    
    .cartlist_warpper_left {
      width: 635px;
      max-height: 579px;;
      border: 1px solid #fff;
      padding: 10px;
      background: #FFFFFF;
      border: 1px solid #928F8F;
    }

    .cartlist_warpper_right {
      width: 500px;
      height: 379px;
      background: #FFFFFF;
      border: 1px solid #928F8F;
    }
  }
`;

// const 

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  color: #FFFFFF;
  width: 1200px;
  text-align: start;
  padding: 0 30px;
`;

function Cart() {
  return (
    <CartWarpper>
      <Title>장바구니</Title>
      <div className="cartlist_warpper">
        <div className="cartlist_warpper_left">
          <div>
            {/* 체크박스, 전체 선택 */}
          </div>
        </div>

        <div className="cartlist_warpper_right">

        </div>
      </div>
    </CartWarpper>
  );
};

export default Cart;