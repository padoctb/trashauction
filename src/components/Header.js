import React from 'react';
import styled from 'styled-components';
import Timer from './Timer'

const StyledHeader = styled.header`
  font-size: 30px;
  display: flex;
  justify-content: flex-end;
`;  

const Header = () => {
  return (
    <StyledHeader>
      <Timer/>
    </StyledHeader>
  );
};

export default Header;
