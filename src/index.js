import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap CSS 추가
import 'react-toastify/dist/ReactToastify.min.css'; // ReactToastify CSS 추가
import { Provider } from 'react-redux';
import { store } from './app/store';
import { loginSuccess } from './features/member/memberSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

// index.js에 로그인 유지하기 구현
(() => {
  // 로그인 정보를 로컬 스토리지에서 가져옴
  const member = JSON.parse(localStorage.getItem('member'));
  
  if (!member) return; // 로그인 정보가 없다면 여기서 멈춤
  store.dispatch(loginSuccess(member));
  })(); // 즉시 실행 함수

root.render(
  <Provider store={store}>
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
