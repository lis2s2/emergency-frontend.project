import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Login from "./component/Login";
import Register from "./component/Register";
import Search from "./component/Search";
import MyPage from "./component/MyPage";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/register')
      .then(response => {
        setGreeting(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the greeting!', error);
      });
  }, []);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<Search />} />
          <Route path="mypage" element={<MyPage />} />

        </Route>
      </Routes>
      <p>{greeting}</p>
    </>
  );
}

export default App;
