import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Lot from './Lot';
import { generateId } from '../tools';
import '../style/styles.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 340px 100px 40px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NewLotWrapper = styled.div``;

const AddNewLotBtn = styled.div`
  width: 50px;
  text-align: center;
  background-color: rgba(249, 249, 249, 0.3);
  border-radius: 4px;
  float: right;
  margin-top: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: rgba(249, 249, 249, 0.5);
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const LotsList = ({ lots, changeLots, setIsChangingLot }) => {
  const addNewLot = () => {
    changeLots((prevLots) => {
      const newLots = [...prevLots];
      newLots.push({ name: '', id: generateId(), price: 0 });
      return newLots;
    });
  };

  const updateLot = (newLotData) => {
    changeLots((prevLots) => {
      const newLots = [...prevLots].map((lot) => {
        if (lot.id === newLotData.id) {
          return newLotData;
        }

        return lot;
      });

      return newLots.sort((a, b) => b.price - a.price);
    });
  };

  const deleteLot = (removedLotData) => {
    if (lots.length === 1) return;
    setIsChangingLot(true);
    changeLots((prevLots) => {
      setTimeout(() => setIsChangingLot(false), 0);
      return [...prevLots].filter((lot) => lot.id !== removedLotData.id);
    });
  };

  return (
    <Wrapper>
      <List>
        <TransitionGroup>
          {lots.map((lot, i) => (
            <CSSTransition key={lot.id} timeout={{
              enter: 300,
              exit: 0
            }} classNames="item">
              <Lot
                setIsChangingLot={setIsChangingLot}
                deleteLot={deleteLot}
                updateLot={updateLot}
                key={lot.id}
                pos={++i}
                lotData={lot}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
      <NewLotWrapper>
        <AddNewLotBtn onClick={addNewLot}>+</AddNewLotBtn>
      </NewLotWrapper>
    </Wrapper>
  );
};

export default LotsList;
