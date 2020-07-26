import React, { useState } from 'react';
import styled from 'styled-components';
import deleteIcon from '../img/icons/delete.svg';

const Wrapper = styled.li`
  font-size: 26px;
  position: relative;
  margin-left: 10px;
  display: flex;
`;

const Input = styled.input`
  border: 2px solid rgba(249, 249, 249, 0.3);
  margin: 6px 0;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  background-color: transparent;
  color: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  outline: none;
  font-size: 22px;
  margin-left: 5px;
  transition: 0.2s ease;
  width: 80px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;

const NameInput = styled(Input)`
  width: 100%;
`;

const Pos = styled.div`
  position: absolute;
  left: -44px;
  top: 50%;
  opacity: 0.4;
  transform: translateY(-50%);
`;

const RemoveBtn = styled.img`
  margin-left: 10px;
  opacity: .6;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Lot = ({ lotData: { name, id, price }, pos, updateLot, deleteLot, lotData }) => {
  const [nameValue, setName] = useState(name);
  const [priceValue, setPrice] = useState(price);
  const [addPriceValue, setAddPrice] = useState('');

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPriceChange = (e) => {
    if(isNaN(e.target.value)) return;
    setPrice(e.target.value);
  };

  const onAddPriceChange = (e) => {
    if(isNaN(e.target.value)) return;
    setAddPrice(e.target.value);
  };

  const onBlurHandler = () => {
    const updatedPrice = Number(priceValue) + Number(addPriceValue);
    setPrice(updatedPrice);
    setAddPrice('');

    updateLot({
      name: nameValue,
      price: updatedPrice,
      id,
    });
  };

  const onDelete = () => deleteLot(lotData)

  return (
    <Wrapper>
      <Pos>{pos}.</Pos>
      <NameInput
        onBlur={onBlurHandler}
        onChange={onNameChange}
        spellCheck="false"
        value={nameValue}
        placeholder="Позиция"
      />
      <Input
        onBlur={onBlurHandler}
        onChange={onPriceChange}
        spellCheck="false"
        value={priceValue}
        placeholder="P"
      />
      <Input
        onBlur={onBlurHandler}
        onChange={onAddPriceChange}
        spellCheck="false"
        value={addPriceValue}
        placeholder="+"
      />
      <RemoveBtn onClick={onDelete} alt="delete" src={deleteIcon} />
    </Wrapper>
  );
};

export default Lot;
