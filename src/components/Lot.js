import React, { useState, useEffect, useRef } from 'react';
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
  width: 80px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:focus {
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
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Lot = ({
  lotData: { name, id, price },
  pos,
  updateLot,
  deleteLot,
  lotData,
  setIsChangingLot,
}) => {
  const priceInputRef = useRef(null);
  const addPriceInputRef = useRef(null);

  const [nameValue, setName] = useState(name);
  const [priceValue, setPrice] = useState(price);
  const [addPriceValue, setAddPrice] = useState('');

  useEffect(() => {
    priceInputRef.current.addEventListener('focus', (e) => e.target.value === '0' && setPrice(''));

    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && e.target.hasAttribute('data-input')) e.target.blur();
    });
  }, []);

  const animateAddingPrice = (animationClassName) => {
    const priceInputClasslist = priceInputRef.current.classList;

    priceInputClasslist.add(animationClassName);
    setTimeout(() => priceInputClasslist.remove(animationClassName), 500);
  };

  const onNameChange = (e) => {
    setIsChangingLot(true);
    setName(e.target.value);
  };

  const onPriceChange = (e) => {
    setIsChangingLot(true);
    if (isNaN(e.target.value)) return;
    setPrice(e.target.value);
  };

  const onAddPriceChange = (e) => {
    setIsChangingLot(true);
    const valueLength = e.target.value.length;
    const isFirstCharIsMinus = valueLength === 1 && e.target.value.charAt(valueLength - 1) === '-';

    if (isNaN(e.target.value) && !isFirstCharIsMinus) return;
    setAddPrice(e.target.value);
  };

  const onDelete = () => deleteLot(lotData);

  const updateValues = () => {
    setIsChangingLot(false);
    let updatedPrice;

    if (addPriceValue.charAt(0) === '-') {
      const number = addPriceValue.substr(1);
      updatedPrice = Number(priceValue) - Number(number);
    } else updatedPrice = Number(priceValue) + Number(addPriceValue);

    if (updatedPrice > priceValue) animateAddingPrice('added-value-animation');
    if (updatedPrice < priceValue) animateAddingPrice('destruct-value-animation');

    setPrice(updatedPrice);
    setAddPrice('');

    updateLot({
      name: nameValue,
      price: updatedPrice,
      id,
    });
  };

  return (
    <Wrapper>
      <Pos>{pos}.</Pos>
      <NameInput
        data-input
        onBlur={updateValues}
        onChange={onNameChange}
        spellCheck="false"
        value={nameValue}
        placeholder="Позиция"
      />
      <Input
        data-input
        ref={priceInputRef}
        onBlur={updateValues}
        onChange={onPriceChange}
        spellCheck="false"
        value={priceValue}
        placeholder="P"
      />
      <Input
        data-input
        ref={addPriceInputRef}
        onBlur={updateValues}
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
