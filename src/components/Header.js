import React from 'react';
import styled from 'styled-components';
import { logoAnimate } from '../style/keyframes';
import logo from '../img/logo.png'

const StyledHeader = styled.header`
  margin-top: 34px;
  font-size: 30px;
  display: flex;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 34px;
  font-size: 34px;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  background-color: gray;
  margin-right: 16px;
  background-image: url(${logo});
  border-radius: 100%;
  background-size: cover;
  animation: ${logoAnimate} 2.5s linear infinite;
  border: 3px solid gray;
`;

const Header = () => {
  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo />
        <div>Шары</div>
      </LogoWrapper>
    </StyledHeader>
  );
};

export default Header;
