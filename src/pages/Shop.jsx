import styled from "styled-components";
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import ShopItem from "../component/ShopItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CartListIcon from "../component/CartListIcon";



const ShopWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px;
`;

const ShopContainer = styled.div`
  width: 1400px;
  height: 600px;
  top: 80px;
  margin-top: 40px;
  background: #FFFFFF;
  border-radius: 40px;
`;

const Title = styled.span`
  font-size: 38px;
  line-height: 23px;
  color: #000000;
  padding-top: 45px;
  padding-left: 110px;
  display: flex;
`;

const Content = styled.span`
  font-size: 24px;
  color: #909090;
  display: flex;
  padding-top: 10px;
  padding-left: 110px;
  font-weight: 300;
`;

function Shop() {
const [items, setItems] = useState([]);
const [toiletItems, setToiletItems] = useState([]);

useEffect(() => {
  try {
    axios.get(`${process.env.REACT_APP_API_URL}/shops`)
    .then((res)=> {
      setItems(res.data);
    })
  } catch (error) {
    console.log(error);
  }
  
}, []);

useEffect(() => {
  try {
    axios.get(`${process.env.REACT_APP_API_URL}/shops/category?category=화장실`)
    .then((res) => {
      setToiletItems(res.data);
    })
  } catch (error) {
    console.log(error);
  }
},[]);


const getRandomItems = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const random10Items = getRandomItems(items, 10);


const navigate = useNavigate();

  return (
    <ShopWrapper>
      <ShopContainer>
        <Title>
          포인트샵 TOP 10
        </Title>
        <Content>
          지금 가장 핫한 10가지 선별했어요!
        </Content>

        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation
          loop={false}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          style={{
            "--swiper-navigation-color": "#5FB393"
          }}
        >
          
          {random10Items?.map((item) => {
            return <SwiperSlide key={item.no}><ShopItem key={item.id} item={item}>{item.title}</ShopItem></SwiperSlide>
          })}
        </Swiper>

      </ShopContainer>

      <ShopContainer>
        <Title>
          급할때 필요한 건 바로!
        </Title>
        <Content>
          곤란하기 전에 해결하자
        </Content>

        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation
          loop={false}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          style={{
            "--swiper-navigation-color": "#5FB393"
          }}
        >
          {toiletItems?.map((item) => {
            // console.log(item);
            return <SwiperSlide key={item.no}><ShopItem item={item} key={item.id}>{item.title}</ShopItem></SwiperSlide>
          })}
        </Swiper>
      </ShopContainer>
      <CartListIcon/>
    </ShopWrapper>
  );
};

export default Shop;