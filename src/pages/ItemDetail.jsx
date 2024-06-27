import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCount } from "../feature/counter/counterSlice";

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
`;

const ImgEx = styled.img`
  width: 500px;
  height: 500px;
  background-color: #bbb;
`;

const ProductWarpper = styled.div`
  width: 512px;
  height: 100px;
  border: 0.5px solid #000000;
  border-radius: 8px;
  margin: 0 auto;
`;



function ItemDetail() {
  const dispatch = useDispatch();

  const count = useSelector(selectCount);


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
              <p className="discount_rate">10%</p>
              <p className="price">2,000원</p>
              <p className="strike_through">2,200</p>
            </div>

            <ProductWarpper>
              <button type="button" onClick={() => dispatch()}>-</button>
              {count}
              <button type="button">+</button>
            </ProductWarpper>
          </div>
      </DetailContainer>
    </DetailWarpper>
  );
};

export default ItemDetail;