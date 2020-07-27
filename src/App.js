import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import bg from './img/bg.jpg';
import tickerIcon from './img/icons/ticker.svg'
import Header from './components/Header';
import LotsList from './components/LotsList';
import TopTicker from './components/TopTicker'
import { generateId } from './tools';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${bg});
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 24px;
    color: #fff;
    font-weight: 600;
    min-width: 600px;
  }
`;

const ToggleTicker = styled.img`
  position: fixed;
  width: 40px;
  height: 40px;
  bottom: 6px;
  right: 10px;
  opacity: .3;
  cursor: pointer;
  transition: .2s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
  &:active {
    transform: scale(1);
  }
`

const App = () => {
  const [lots, changeLots] = useState([
    {
      name: '',
      id: generateId(),
      price: 0,
    },
  ]);

  const [isChangingLot, setIsChangingLot] = useState(false);
  const [isShowTicker, setIsShowTicker] = useState(true)

  const toggleTicker = () => setIsShowTicker(prevState => !prevState);

  return (
    <>
      <GlobalStyle />
      {isShowTicker && <TopTicker isChangingLot={isChangingLot} lots={lots}/>}
      <Header setIsShowTicker={setIsShowTicker}/>
      <LotsList setIsChangingLot={setIsChangingLot} changeLots={changeLots} lots={lots} />
      <ToggleTicker onClick={toggleTicker} alt='ticker' src={tickerIcon}/>
    </>
  );
};

export default App;
