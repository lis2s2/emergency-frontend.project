import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  
  background-color: #5FB393;
  display: flex;
  flex-direction: column;
  align-items: center;
  

`;

function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;