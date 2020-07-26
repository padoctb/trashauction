import React, {useState} from 'react';
import styled from 'styled-components';
import Timer from './Timer'

const StyledHeader = styled.header`
  font-size: 30px;
  justify-content: space-between;
  position: fixed;
  right: 0;
  top: 5%;
  flex-direction: column;
`;

const Buyout = styled.div`
  opacity: .5;
  font-weight: 500;
  padding-left: 114px;
  padding-top: 14px;
  transform: translateY(10px);
`

const BayoutInput = styled.input`
  border: none;
  outline: none;
  margin-right: 22px;
  background-color: transparent;
  font-size: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 90px;
  color: #fff;
`

const Header = () => {

  const [value, setValue] = useState(4000)

  const onChangeHandler = e => !isNaN(e.target.value) && setValue(e.target.value)

  return (
    <StyledHeader>
      <Buyout>Выкуп: <BayoutInput onChange={onChangeHandler} value={value}/></Buyout>
      <Timer initialTime={1500000}/>
    </StyledHeader>
  );
};

export default Header;
