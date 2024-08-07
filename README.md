# 🚀나 지금 급해 (2024.06.21 ~ 2024.07.18)


<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">


***
+ 웹 사이트 가로 1440px 세로 1024px
+ 반응형 max-width 767px
***
### Backend
https://github.com/lis2s2/emergengy-backend.project

##### 네이버 로그인 토큰 발급 
<!-- 1번 입력 순서 상관X -->
<!-- 1. Param -->
https://nid.naver.com/oauth2.0/token
code={인가코드}&state={client-secret}&client_id={client-id}&client_secret={client-secret}&grant_type=authorization_code

<!-- 2. Header -->
https://openapi.naver.com/v1/nid/me
Authorization Bearer {access_token}

# 카카오 로그인 토큰 발급
<!-- 1. Param -->
https://kauth.kakao.com/oauth/token
code={인가코드}&client_id={client-id}&redirect_uri={REDIRECT_URI}&grant_type=authorization_code

<!-- 2. Header -->
https://kapi.kakao.com/v2/user/me
https://kapi.kakao.com/v1/user/access_token_info
Authorization Bearer {access_token}

# 리액트 설치 라이브러리 
![image](https://github.com/user-attachments/assets/14e29a1a-85b0-41b0-a9a6-47168c1a7095)

