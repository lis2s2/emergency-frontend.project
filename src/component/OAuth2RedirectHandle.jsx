import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OAuth2RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      // 여기에 백엔드 서버로 인증 코드를 보내는 로직을 추가하세요.
      axios
        .post("http://localhost:8080/login/oauth2/code/kakao", { code })
        .then((response) => {
          // 인증이 성공하면 토큰을 저장하고 원하는 페이지로 리디렉션합니다.
          alert("로그인 성공");
          navigate("/");
        })
        .catch((error) => {
          console.error("인증 실패", error);
          alert("인증에 실패했습니다.");
        });
    } else {
      alert("인증 코드가 없습니다.");
      navigate("/login");
    }
  }, [location, navigate]);
}

export default OAuth2RedirectHandler;
