import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import bg from './img/bg.jpg';
import tickerIcon from './img/icons/ticker.svg';
import bgIcon from './img/icons/bg.svg';
import Header from './components/Header';
import LotsList from './components/LotsList';
import TopTicker from './components/TopTicker';
import { generateId } from './tools';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${({ bgValue }) => (bgValue ? bgValue : bg)});
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 24px;
    color: #fff;
    font-weight: 600;
    min-width: 600px;
    background-color: gray;
  }
`;

const SettingsButtons = styled.div`
  position: fixed;
  bottom: 6px;
  right: 10px;
  display: flex;
  align-items: center;
`;

const SettingsBtn = styled.img`
  opacity: ${({ isActive }) => (isActive ? '.6' : '.3')};
  cursor: pointer;
  transition: 0.2s ease;
  display: block;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
  &:active {
    transform: scale(1);
  }
`;

const ToggleTicker = styled(SettingsBtn)`
  width: 40px;
  height: 40px;
`;

const BgChange = styled(SettingsBtn)`
  width: 32px;
  height: 32px;
  margin-bottom: 1px;
  margin-right: 4px;
`;

const BgInputWrapper = styled.div`
  display: flex;
  margin-right: -20px;
`;

const BgInput = styled.input`
  border: 2px solid rgba(249, 249, 249, 0.3);
  border-radius: 4px;
  padding: 6px;
  box-sizing: border-box;
  background-color: transparent;
  color: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  transition: 0.2s ease;
  outline: none;
  font-size: 14px;
  margin-right: 10px;
  padding-right: 30px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;

const RemoveBgBtn = styled.div`
  transform: translateX(-40px);
  font-weight: 400;
  cursor: pointer;
  padding: 0 10px;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
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

  const bgFromLs = localStorage.getItem('backgroundUrl')
    ? localStorage.getItem('backgroundUrl')
    : '';

  const [isChangingLot, setIsChangingLot] = useState(false);
  const [isShowTicker, setIsShowTicker] = useState(true);
  const [isChangeBgActive, setIsChangeBgActive] = useState(false);
  const [bgInputValue, setBgInputValue] = useState(bgFromLs);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const isClickedOut =
        e.path.find((element) => element.id === 'settings-wrapper') === undefined;
      if (isChangeBgActive && isClickedOut) setIsChangeBgActive(false);
    });
  }, [isChangeBgActive]);

  const toggleTicker = () => setIsShowTicker((prevState) => !prevState);

  const toggleBgChangeState = () => setIsChangeBgActive((prevState) => !prevState);

  const onChangeBgInputValueHandler = (e) => {
    localStorage.setItem('backgroundUrl', e.target.value);
    setBgInputValue(e.target.value);
  };

  const clearBgInputValue = () => setBgInputValue('');

  return (
    <>
      <GlobalStyle bgValue={bgInputValue} />
      <ReactTooltip />
      {isShowTicker && <TopTicker isChangingLot={isChangingLot} lots={lots} />}
      <Header setIsShowTicker={setIsShowTicker} />
      <LotsList setIsChangingLot={setIsChangingLot} changeLots={changeLots} lots={lots} />
      <SettingsButtons id="settings-wrapper">
        {isChangeBgActive && (
          <BgInputWrapper>
            <BgInput
              placeholder="URL фона..."
              onChange={onChangeBgInputValueHandler}
              value={bgInputValue}
            />
            <RemoveBgBtn onClick={clearBgInputValue} data-tip="Очистить фон">
              x
            </RemoveBgBtn>
          </BgInputWrapper>
        )}
        <BgChange
          onClick={toggleBgChangeState}
          data-place="left"
          data-tip="Сменить фон"
          isActive={isChangeBgActive}
          src={bgIcon}
        />
        <ToggleTicker
          data-place="left"
          data-tip={isShowTicker ? 'Убрать бегущую строку' : 'Показать бегущую строку'}
          isActive={isShowTicker}
          onClick={toggleTicker}
          alt="ticker"
          src={tickerIcon}
        />
      </SettingsButtons>
    </>
  );
};

export default App;
