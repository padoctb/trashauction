import React from 'react';
import styled from 'styled-components';
import Timer from './Timer'

const StyledHeader = styled.header`
  font-size: 30px;
  justify-content: flex-end;
  position: fixed;
  right: 0;
  top: 0;
`;  

const Header = () => {
  return (
    <StyledHeader>
      <Timer initialTime={1500000}/>
    </StyledHeader>
  );
};

export default Header;
