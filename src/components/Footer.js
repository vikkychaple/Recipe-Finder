import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      © 2023 vikkychaple007@gmail.com. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
