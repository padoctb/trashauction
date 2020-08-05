import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import downloadIcon from '../img/icons/download.svg';
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

const BottomButtons = styled.div``;

const DownloadCsvBtn = styled.img`
  float: right;
  float: right;
  opacity: .4;
  margin-top: 11px;
  margin-right: 13px;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
    color: #fff;
  }
  &:active {
    transform: scale(0.9);
  }
`

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

  const downloadCSV = () => {
    const lotsNames = lots.map(lot => [lot.name])
    const lotsInCsv = `data:text/csv;charset=utf-8,${lotsNames.map(lotName => lotName.join(",")).join("\n")}`
    const encodedUri = encodeURI(lotsInCsv);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `auction_lots (${new Date().toLocaleString()}).csv`);
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  }

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
      <BottomButtons>
        <AddNewLotBtn onClick={addNewLot}>+</AddNewLotBtn>
        <DownloadCsvBtn onClick={downloadCSV} data-effect='solid' data-place="top" data-tip='Ипортировать лоты в CSV' src={downloadIcon}/>
      </BottomButtons>
    </Wrapper>
  );
};

export default LotsList;
