import styled from "styled-components";
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import ShopItem from "../component/ShopItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



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

export const CartIcon = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  right: 82px;
  top: 140px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s background ease-in;
  z-index: 999;

  &:hover{
    background: #f0f0f0;
  }
`;

const CartNumDiv = styled.div`
  position: fixed;
  width: 30px;
  height: 30px;
  right: 100px;
  top: 163px;
  border-radius: 50%;
  background: #FF6E4E;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartNum = styled.span`
  color: #fff;
  font-size: 20px;
`;



function Shop() {
const [items, setItems] = useState([]);
const [toiletItems, setToiletItems] = useState([]);

useEffect(() => {
  try {
    axios.get(`${process.env.REACT_APP_API_URL}/shops`)
    .then((res)=> {
      // console.log(res.data);
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
            console.log(item);
            return <SwiperSlide key={item.no}><ShopItem item={item} key={item.id}>{item.title}</ShopItem></SwiperSlide>
          })}
        </Swiper>
      </ShopContainer>


      <CartIcon className="cursor-pointer" onClick={() => navigate('/cart')}>
        <svg width="50" height="53" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5474 7.64287C19.4476 6.64179 19.005 5.71796 18.3075 5.05446C17.6099 4.39097 16.7083 4.03622 15.7812 4.06053H14.7116C14.5281 2.92319 13.9812 1.89254 13.1669 1.14984C12.3527 0.407154 11.3234 0 10.26 0C9.19661 0 8.16728 0.407154 7.35306 1.14984C6.53884 1.89254 5.99188 2.92319 5.80838 4.06053H4.72372C3.79666 4.03622 2.89501 4.39097 2.19746 5.05446C1.49992 5.71796 1.05738 6.64179 0.957552 7.64287L0.0160087 18.5698C-0.0311897 19.1057 0.0262609 19.6464 0.184608 20.1566C0.342956 20.6668 0.598638 21.135 0.934955 21.5306C1.29579 21.9548 1.73384 22.2931 2.22136 22.524C2.70888 22.7549 3.23524 22.8734 3.76712 22.8719H16.7529C17.2848 22.8734 17.8111 22.7549 18.2986 22.524C18.7862 22.2931 19.2242 21.9548 19.585 21.5306C19.9214 21.135 20.177 20.6668 20.3354 20.1566C20.4937 19.6464 20.5512 19.1057 20.504 18.5698L19.5474 7.64287ZM10.26 1.60688C10.9263 1.60923 11.573 1.85132 12.0991 2.29528C12.6252 2.73924 13.0009 3.36003 13.1675 4.06053H7.35251C7.51908 3.36003 7.89479 2.73924 8.42087 2.29528C8.94695 1.85132 9.59372 1.60923 10.26 1.60688ZM18.4703 20.4182C18.2525 20.6772 17.9871 20.8838 17.6914 21.0247C17.3956 21.1656 17.0759 21.2376 16.7529 21.2361H3.76712C3.44413 21.2376 3.12444 21.1656 2.82865 21.0247C2.53286 20.8838 2.26752 20.6772 2.04974 20.4182C1.85533 20.1915 1.70719 19.9228 1.61503 19.6296C1.52288 19.3365 1.48877 19.0255 1.51495 18.717L2.47909 7.79827C2.54128 7.20562 2.80683 6.66018 3.22282 6.27063C3.63882 5.88107 4.17471 5.67601 4.72372 5.6963H5.74059V7.33207C5.74059 7.54899 5.81995 7.75702 5.96121 7.9104C6.10247 8.06379 6.29406 8.14996 6.49383 8.14996C6.6936 8.14996 6.88518 8.06379 7.02644 7.9104C7.1677 7.75702 7.24706 7.54899 7.24706 7.33207V5.6963H13.2729V7.33207C13.2729 7.54899 13.3523 7.75702 13.4936 7.9104C13.6348 8.06379 13.8264 8.14996 14.0262 8.14996C14.2259 8.14996 14.4175 8.06379 14.5588 7.9104C14.7001 7.75702 14.7794 7.54899 14.7794 7.33207V5.6963H15.7963C16.3478 5.6718 16.8875 5.87495 17.3067 6.26491C17.7259 6.65486 17.9936 7.2027 18.056 7.79827L19.0201 18.7252C19.0432 19.0335 19.0062 19.3437 18.9115 19.6354C18.8167 19.9271 18.6664 20.1939 18.4703 20.4182Z" fill="#010035"/>
        </svg>

        {/* 장바구니가 비어있으면 안보이게 조건부로 만들기 */}
        <CartNumDiv>
          <CartNum>1</CartNum>
        </CartNumDiv>

      </CartIcon>
    </ShopWrapper>
  );
};

export default Shop;