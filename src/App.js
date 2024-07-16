import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import ToiletDetail from "./component/ToiletDetail";
import ToiletList from "./component/ToiletList";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ItemDetail from "./pages/ItemDetail";
import FindId from "./pages/FindId";
import Modify from "./pages/Modify";
import OAuth2NavertHandle from "./component/OAuth2NavertHandle";
import OAuth2KakaoHandle from "./component/OAuth2KakaoHandle";
import FindPwd from "./pages/FindPwd";
import ToiletRegister from "./pages/ToiletRegister";
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
          <Route path="toilet_register" element={<ToiletRegister />} />
          <Route path="login" element={<Login />} />
          <Route index element={<Main />} />
          <Route path="login/*" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="find/id" element={<FindId />} />
          <Route path="find/pwd" element={<FindPwd />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/detail/:productId" element={<ItemDetail />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="mypage/modify/*" element={<Modify />} />
          <Route path="login/oauth2/code/naver/*" element={<OAuth2NavertHandle />} />
          <Route path="login/oauth2/code/kakao/*" element={<OAuth2KakaoHandle />} />
          <Route path="order" element={<Order/>} />
          <Route path="/*" element={<Main/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
