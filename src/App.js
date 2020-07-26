import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import bg from './img/bg.jpg';
import Header from './components/Header';
import LotsList from './components/LotsList';
import Ticker from 'react-ticker';
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

const TopTicket = styled.span`
  font-weight: 400;
  font-size: 22px;
`;

const LotWrapper = styled.span`
  padding: 0 22px;
  &:last-child {
    padding-right: 400px;
  }
`;

const LotPosition = styled.span``;

const LotName = styled.span``;

const LotPrice = styled.span`
  padding: 0 4px;
`;

const TickerWrapper = styled.div`
  position: fixed;
  width: 20000px;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 36px;
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

  const createContentForTicker = (lots) => {
    const lotsForRender = [];

    lots.forEach((lot, i) => {
      if (!lot.name) return;

      lotsForRender.push({
        content: (
          <span>
            <LotPosition>{++i}. </LotPosition>
            <LotName>{lot.name}</LotName>
            <LotPrice>({lot.price})</LotPrice>
          </span>
        ),
        id: lot.id,
      });
    });

    return lotsForRender;
  };

  const tickerContent = createContentForTicker(lots);

  return (
    <>
      {isShowTicker && <TickerWrapper>
        {!isChangingLot && (
          <Ticker offset={600} speed={14} mode="chain">
            {() => (
              <TopTicket>
                {tickerContent.length > 1 &&
                  tickerContent.map((lot) => <LotWrapper key={lot.id}>{lot.content}</LotWrapper>)}
              </TopTicket>
            )}
          </Ticker>
        )}
      </TickerWrapper>}
      <GlobalStyle />
      <Header setIsShowTicker={setIsShowTicker}/>
      <LotsList setIsChangingLot={setIsChangingLot} changeLots={changeLots} lots={lots} />
    </>
  );
};

export default App;
