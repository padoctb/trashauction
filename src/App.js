import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import bg from './img/bg.jpg';
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

  return (
    <>
      <GlobalStyle />
      {isShowTicker && <TopTicker isChangingLot={isChangingLot} lots={lots}/>}
      <Header setIsShowTicker={setIsShowTicker}/>
      <LotsList setIsChangingLot={setIsChangingLot} changeLots={changeLots} lots={lots} />
    </>
  );
};

export default App;
