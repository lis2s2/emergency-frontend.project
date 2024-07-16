import { Button, Container, Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess, selectMember } from "../features/member/memberSlice";
import axios from "axios";

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
`;

const RegBtn = styled(Button)`
  background-color: #5fb393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;
`;

const MyPageBtn = styled(Button)`
  background-color: #5fb393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;
`;

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #888888;
  text-align: start;
  vertical-align: middle;
`;


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectMember);
  

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  const handleRegisterClick = () => {
    navigate("/register");
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
    navigate("/");
  };
  
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
                onClick={() => {
                  if (!member) {
                    alert('로그인 하세요.');
                  } else {
                    navigate('/toilet_register');
                  }
                }}
              >
                화장실 등록
              </Nav.Link>
              <Nav.Link
                className="ms-3 align-self-center"
                onClick={() => navigate("/shop")}
              >
                포인트샵
              </Nav.Link>
              {member ? (
                <>
                  <Nav.Link
                    className="ms-4"
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
                    onClick={() => {
                      navigate("/login");
                    }}
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
            </Nav>
          </Container>
        </CustomedNavbar>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
