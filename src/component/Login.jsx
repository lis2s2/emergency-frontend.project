import styled from "styled-components";


const LoginContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #5FB393;
  min-height: 820px;
`

function Login() {
  return (
    <LoginContainer>
      로그인 페이지
    </LoginContainer>
  );
};

export default Login;