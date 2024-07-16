import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import styled, { css } from "styled-components";
import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess, selectMember } from "../features/member/memberSlice";
import axios from "axios";
import { useState } from "react";

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

  @media screen and (max-width: 767px) { 
    .ms-3.align-self-center{
      display: none;
    }
    .ms-4.member-name {
      display: none !important;
    }
  }
  
`;

const CustomedNavbar = styled(Navbar)`
  height: 100px;
`;

const LoginBtn = styled(Button)`
  box-sizing: border-box;

  background-color: #ffffff;
  color: #5fb393;
  border: solid 2px #5fb393;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  &:hover {
    background: #157347;
    color: #ffffff;
    transition: 0.7s;
    border: 2px solid #157347;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const RegBtn = styled(Button)`
  background-color: #5fb393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;

  @media screen and (max-width: 767px){
    display: none;
  }
`;

const MyPageBtn = styled(Button)`
  background-color: #5fb393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;

  @media screen and (max-width: 768px){
    display: none;
  }
  `;

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #888888;
  text-align: start;
  vertical-align: middle;

  @media screen and (max-width: 767px){
    display: none;
  }
  `;

const HamburgerBtn = styled(GiHamburgerMenu)`
  width: 40px;
  height: 40px;
  color: #5fb393;
  cursor: pointer;
  display: none;
  
  
  @media screen and (max-width: 767px){
    display: block;
  }
`;

const MLoginBtn = styled.button`
  width: 100px ;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #5fb393;
  border: solid 2px #5fb393;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  display: none;
  margin-left: auto;
  &:hover {
    background: #157347;
    color: #ffffff;
    transition: 0.7s;
    border: 2px solid #157347;
  }
  @media screen and (max-width: 767px){
    display: block;
  }
`;

const Menu = styled.div`
  width: 50%;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  z-index: 2;
  right: -50%;
  top: 0;
  display: flex;
  right: 0;
  right:-100%;
  flex-direction: column;
  transition: 0.5s;
  ${(props) => props.$isToggle &&
      css`
        right: 0;
      `
    }
  .menu-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    .m-menu-ul {
      text-align: right;
      color: #5fb393;
      padding: 20px;
      margin-top: 20px;
      .m-menu-li {
        margin-bottom: 20px;
        font-size: 30px;
        padding: 10px;
      }
    }
  }
`;

const CloseBtn = styled(IoCloseOutline)`
  width: 50px;
  height: 50px;
  margin-left: auto;
  color: #5fb393;
  margin-top: 20px;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(false);
  const member = useSelector(selectMember);

  const handleMyPageClick = () =>  {
    navigate("/mypage");
    setIsToggle(false);
  };
  
  const handleRegisterClick = () => {
    navigate("/register");
    setIsToggle(false);
  };
  
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
        headers: {
          Authorization: token,
        },
      });
      if (result.status === 200) {
        alert('정상적으로 로그아웃 되었습니다.');
      }
    } catch (error) {
      alert('인터넷 접속 상태를 확인하세요.')
    }
    dispatch(logoutSuccess());
    localStorage.removeItem("member");
    localStorage.removeItem("token");
    setIsToggle(false)
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
    setIsToggle(false);
  }

  const handleToShop = () => {
    navigate('/shop');
    setIsToggle(false);
  }
  
  const handleToToiletRegister = () => {
    if (!member) {
      alert('로그인 하세요.');
    }
    navigate('/toilet_register');
    setIsToggle(false);
  }

  const handleHamburder = () => {
    setIsToggle(!isToggle);
  }
  
  return (
    <HeaderContainer>
      <HeaderInner>
        <CustomedNavbar bg="white" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="/">
              <img src={logoImg} alt="logoImg" width="60px" />
            </Navbar.Brand>
            <Nav className="ml-auto" style={{ alignItems: "center" }}>
              <Nav.Link
                className="ms-3 align-self-center"
                onClick={handleToToiletRegister}
              >
                화장실 등록
              </Nav.Link>
              <Nav.Link
                className="ms-3 align-self-center"
                onClick={handleToShop}
              >
                포인트샵
              </Nav.Link>
              {member ? (
                <>
                  <Nav.Link
                    className="ms-4 member-name"
                    variant="success"
                    onClick={handleMyPageClick}
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignContent: "flex-end"
                    }}
                  >
                    {member?.memName}님
                    <StyledContent>({Number(member?.memPoint).toLocaleString('ko-KR')}점)</StyledContent>
                  </Nav.Link>
                  <LoginBtn
                    className="ms-3"
                    variant="outline-succes"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </LoginBtn>
                  <MyPageBtn
                    className="ms-3"
                    variant="success"
                    onClick={handleMyPageClick}
                  >
                    마이페이지
                  </MyPageBtn>
                </>
              ) : (
                <>
                  <LoginBtn
                    className="ms-4"
                    variant="outline-success"
                    onClick={handleLogin}
                  >
                    로그인
                  </LoginBtn>
                  <RegBtn
                    className="ms-3"
                    variant="success"
                    onClick={handleRegisterClick}
                  >
                    회원가입
                  </RegBtn>
                </>
              )}
              <HamburgerBtn onClick={handleHamburder}/>
            </Nav>
          </Container>
        </CustomedNavbar>
      </HeaderInner>

      {/* {isToggle?  */}
      <Menu $isToggle={isToggle}>
        <CloseBtn onClick={handleHamburder}/>
        <div className="menu-container">
          <ul className="m-menu-ul">
            
            <li className="m-menu-li" onClick={handleToToiletRegister}>화장실등록</li>
            <li className="m-menu-li" onClick={handleToShop}>포인트샵</li>
            {member? <li className="m-menu-li" onClick={handleMyPageClick}>마이페이지</li>:null}
          </ul>

          <ul className="m-menu-ul login">
            {member? 
            // (<li className="m-menu-li logout" onClick={handleLogout} >로그아웃</li>)
            <MLoginBtn onClick={handleLogout}>로그아웃</MLoginBtn>
            :
            // (<li className="m-menu-li login" onClick={handleLogin}>로그인</li>)}
            <MLoginBtn onClick={handleLogin}>로그인</MLoginBtn>
            }
          </ul>
        </div>
      </Menu>
      {/* :
      null
      } */}
    </HeaderContainer>
  );
}

export default Header;
