import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Layout from "./pages/Layout";
import Main from "./pages/Main";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import MyPage from "./pages/MyPage";
import ToiletDetail from "./component/ToiletDetail";
import ToiletList from "./component/ToiletList";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ItemDetail from "./pages/ItemDetail";
import ShopItem from "./component/ShopItem";
import Order from "./pages/Order";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }

  #root {
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  /* 넘치는 텍스트에 줄임표(...) 만들기 */
  .text-ellipsis {
    white-space: nowrap; // 줄바꿈 안함
    overflow: hidden; // 넘친 부분 숨기기
    text-overflow: ellipsis; // 넘친 부분을 어떻게 보일지 지정(ellipsis = 줄임표)
  }
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />}>
            <Route index element={<ToiletList />} />
            <Route path="detail/:toiletNo" element={<ToiletDetail />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<Search />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/detail/:productId" element={<ItemDetail />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="order" element={<Order/>} />
          <Route path="/*" element={<Main/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
