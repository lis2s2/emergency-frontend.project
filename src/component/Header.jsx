import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import styled from "styled-components";

import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ffffff;
`;
const HeaderInner = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #ffffff;
  margin: 0 auto;
  font-size: 18px;
`;

const CustomedNavbar = styled(Navbar)`
  height: 100px;
`;

const LoginBtn = styled(Button)`
  background-color: #ffffff;
  color: #5FB393;
  border: solid 2px #5FB393;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
`;

const RegBtn = styled(Button)`
  background-color: #5FB393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;
  

`;


function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <HeaderContainer>
      <HeaderInner>
        <CustomedNavbar bg="white" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">
              <img src={logoImg} alt="logoImg" width="60px" />
            </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="#" className="align-self-center">나지금급해</Nav.Link>
              <Nav.Link className="ms-3 align-self-center" >화장실 등록</Nav.Link>
              <NavDropdown className="ms-3 align-self-center" title="게시판" id="navbarScrollingDropdown">
                <NavDropdown.Item className="mb-2 py-2 align-self-center">자유 게시판</NavDropdown.Item>
                <NavDropdown.Item className="mb-2 py-2 align-self-center">긴급 요청 게시판</NavDropdown.Item>
                <NavDropdown.Item className="py-2 align-self-center">뉴스 게시판</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing" className="ms-3 align-self-center">포인트샵</Nav.Link>
              <LoginBtn className="ms-4" variant="outline-success" onClick={handleLoginClick}>로그인</LoginBtn>
              <RegBtn className="ms-3" variant="success" onClick={handleRegisterClick}>회원가입</RegBtn>
            </Nav>
          </Container>
        </CustomedNavbar>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
