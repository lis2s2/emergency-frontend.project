import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
`;

const FooterInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1440px;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 40px;
  color: #999;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterInner>
        Copyright © 2024 나지금급해 | All Rights Reserved 
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;