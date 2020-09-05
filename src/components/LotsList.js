import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import downloadIcon from '../img/icons/download.svg';
import Lot from './Lot';
import { generateId, downloadCsvFile } from '../tools';
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

const BottomButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

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

const DownloadCsvWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const DownloadCsvBtn = styled.img`
  float: right;
  opacity: ${({ isActive }) => (isActive ? '1' : '.4')};
  transform: ${({ isActive }) => (isActive ? 'scale(1.2)' : 'inherit')};
  margin-top: 11px;
  margin-right: 13px;
  transition: 0.2s ease;
  cursor: pointer;
  position: relative;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
    color: #fff;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const DownloadCsvPopup = styled.div`
  position: absolute;
  color: #000;
  display: flex;
  font-weight: 400;
  flex-direction: column;
  top: 48px;
  font-size: 16px;
  right: 0;
  box-shadow: 0px 8px 15px -1px rgb(0, 0, 0, 0.5);
  &::before {
    content: '';
    position: absolute;
    top: -7px;
    right: 17px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7.5px 10px 7.5px;
    border-color: transparent transparent #ffffff transparent;
  }
`;

const CsvPopupItem = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  background-color: #fff;
  z-index: 1;
  &:first-child {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  &:last-child {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:hover {
    background-color: #e1e1e1;
  }
`;

const LotsList = ({ lots, changeLots, setIsChangingLot }) => {
  const [isCsvWindowOpen, setIsCsvWindowOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const path = e.path || (e.composedPath && e.composedPath());

      const isClickedOut =
        path.find((element) => element.id === 'download-csv-popup') === undefined;
      if (isCsvWindowOpen && isClickedOut) setIsCsvWindowOpen(false);
    });
  }, [isCsvWindowOpen]);

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

  const downloadCsvModified = () => {
    const lotsNames = [];

    lots.forEach((lot) => {
      if (!lot.price) return;
      for (let i = 0; i < lot.price; i++) {
        lotsNames.push([lot.name]);
      }
    });

    const lotsInCsv = `data:text/csv;charset=utf-8,${lotsNames
      .map((lotName) => lotName.join(','))
      .join('\n')}`;

    downloadCsvFile(lotsInCsv);
  };

  const downloadCsvDefault = () => {
    const lotsNames = lots.map((lot) => [lot.name]);
    const lotsInCsv = `data:text/csv;charset=utf-8,${lotsNames
      .map((lotName) => lotName.join(','))
      .join('\n')}`;

    downloadCsvFile(lotsInCsv);
  };

  const toggleDownloadCsvWindow = () => setIsCsvWindowOpen((prevState) => !prevState);

  return (
    <Wrapper>
      <List>
        <TransitionGroup>
          {lots.map((lot, i) => (
            <CSSTransition
              key={lot.id}
              timeout={{
                enter: 300,
                exit: 0,
              }}
              classNames="item"
            >
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
        <DownloadCsvWrapper id="download-csv-popup">
        <CSSTransition unmountOnExit mountOnEnter in={isCsvWindowOpen} timeout={200} classNames="csv-popup">
            <DownloadCsvPopup>
              <CsvPopupItem onClick={downloadCsvModified}>
                Загрузить с учётом кол-ва шаров
              </CsvPopupItem>
              <CsvPopupItem onClick={downloadCsvDefault}>Обычная загрузка</CsvPopupItem>
            </DownloadCsvPopup>
          </CSSTransition>
          <DownloadCsvBtn
            isActive={isCsvWindowOpen}
            onClick={toggleDownloadCsvWindow}
            data-effect="solid"
            data-place="top"
            data-tip="Загрузить список в .CSV"
            src={downloadIcon}
          />
        </DownloadCsvWrapper>
      </BottomButtons>
    </Wrapper>
  );
};

export default LotsList;
