import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { decrement, increment, selectCount } from "../feature/counter/counterSlice";
import { CartIcon } from "./Shop";

const DetailWarpper = styled.div`
  width: 1440px;
  margin: 0 auto;
  background-color: #fff;
  height: 900px;
  border-top: 20px solid #5FB393;
  border-bottom: 20px solid #5FB393;
  padding: 20px;
`;

const DetailContainer = styled.div`
  height: 600px;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;

  .img_warpper {
    width: 50%;
    margin: auto 0;
  }
  
  .content_warpper {
    width: 50%;
  }

  .title_container {
    width: 500px;
    height: 200px;
    border-bottom: 1px solid black;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    color: #4d4d4d;
    text-align: left;
    line-height: 34px;
  }

  .price_warpper {
    display: flex;
    gap: 10px;
    margin: 0 auto;
    width: 500px;
    height: 96px;
    align-items: center;
  }

  .discount_rate {
    font-weight: 300;
    font-size: 32px;
    line-height: 38px;
    color: #FF0000;
  }

  .price {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #000000;
  }

  .strike_through {
    font-weight: 300;
    font-size: 32px;
    line-height: 38px;
    text-decoration-line: line-through;
    color: #707070;
  }

  .btn_container {
    width: 512px;
    height: 100px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ImgEx = styled.img`
  width: 500px;
  height: 500px;
  background-color: #bbb;
`;

const ProductWarpper = styled.div`
  width: 512px;
  height: 126px;
  border: 1px solid #000000;
  border-radius: 18px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .btn_group {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 150px;
    height: 40px;
    border-radius: 8px;
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
    height: 40px;
    border: 1px solid black;
    font-size: 24px;
  }
`;

const StyledBtnWhite = styled.button`
  border: 2px solid #5FB393;
  width: 240px;
  height: 60px;
  background: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #5FB393;
  transition: 0.2s background ease-in;

  &:hover {
    background-color: #157347;
    color: #fff;
    border: 2px solid #157347;
  }
`;

const StyledBtn = styled.button`
  width: 240px;
  height: 60px;
  background: #5FB393;
  border-radius: 8px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
  transition: 0.2s background ease-in;
  border: none;

  &:hover {
    background: #157347;
  }
`;



function ItemDetail() {
  const dispatch = useDispatch();

  const count = useSelector(selectCount);

  const formatter = new Intl.NumberFormat('ko-KR');


  return (
    <DetailWarpper>
      <DetailContainer>
          <div className="img_warpper">
            <ImgEx src="https://www.yonexmall.com/shop/data/goods/1645767865278s0.png"/>
          </div>
          <div className="content_warpper">
            <div className="title_container">
              <p className="title">곤란한 일이 생기기 전 바로 준비해놓는 휴지</p>
            </div>
            <div className="price_warpper">

              {/* 10% 고정 / strike...를 price에서 더한값으로 내기 */}
              {/* 하드코딩 고치기 */}
              <p className="discount_rate">10%</p>
              <p className="price">2,000원</p>
              <p className="strike_through">2,200</p>
            </div>

            <ProductWarpper>
              <div className="btn_group">
                <button type="button" className="btn" onClick={() => dispatch(decrement())}>-</button>
                <div className="count_area">{count}</div>
                <button type="button" className="btn" onClick={() => dispatch(increment())}>+</button>
              </div>
              <div>
                <p className="price">{formatter.format( count * 2000)}원</p>
                {/* 이부분 나중에 count * price 로 바꿔야 함 */}
              </div>
            </ProductWarpper>
            <div className="btn_container">
              <StyledBtnWhite>장바구니</StyledBtnWhite>
              <StyledBtn>바로 구매하기</StyledBtn>
            </div>
          </div>
      </DetailContainer>

      <CartIcon className="cursor-pointer"/>
    </DetailWarpper>
  );
};

export default ItemDetail;