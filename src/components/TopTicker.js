import React from 'react';
import styled from 'styled-components';
import Ticker from 'react-ticker';

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

const LotPosition = styled.span`
  font-weight: 600;
`;

const LotName = styled.span`
  font-weight: 400;
`;

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
  z-index: 10;
`;

const TopTicker = ({ lots, isChangingLot }) => {

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
      {(
        <TickerWrapper>
          {!isChangingLot && (
            <Ticker offset={600} speed={10} mode="chain">
              {() => (
                <TopTicket>
                  {tickerContent.length > 1 &&
                    tickerContent.map((lot) => <LotWrapper key={lot.id}>{lot.content}</LotWrapper>)}
                </TopTicket>
              )}
            </Ticker>
          )}
        </TickerWrapper>
      )}
    </>
  );
};

export default TopTicker;
