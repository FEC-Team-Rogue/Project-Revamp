import React, {
  useState, useEffect,
} from 'react';
import styled from 'styled-components';
import GlobalStyle from '../GlobalStyle';
import { useOverview } from '../SharedContexts/OverviewProvider';
import Button from '../SharedComponents/Button';

function Cart() {
  const { currentStyle } = useOverview();
  const [sizes, setSizes] = useState([]);
  const quantitiesArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const uniqueArray = [];

  function handleClick(event) {
    event.preventDefault();
  }

  function updateSKU() {
    if (currentStyle) {
      for (const keys in currentStyle) {
        if (keys === 'skus') {
          for (const sku in currentStyle.skus) {
            uniqueArray.push(currentStyle.skus[sku].size);
          }
        }
      }
      const uniqueSet = new Set(uniqueArray);
      setSizes([...uniqueSet]);
    }
  }

  useEffect(() => (
    setSizes([])
  ), [currentStyle]);

  useEffect(() => (
    updateSKU()
  ), [currentStyle]);

  if (!currentStyle && sizes.length === 0) {
    return null;
  }

  return (
    <div className="Cart">
      <div id="size">
        <Title>Size</Title>
        {sizes && sizes.length > 0 ? sizes.map((size, index) => <ButtonStyled key={index}>{size}</ButtonStyled>) : 'Out Of Stock'}
      </div>
      <div id="quantity">
        <Dropdown>
          {quantitiesArray.map(
            (quantity, index) => <FancyOption key={index}>{quantity}</FancyOption>,
          )}
        </Dropdown>
      </div>
      <Button label="Add To Cart" handleClick={() => handleClick} />
    </div>
  );
}

export default Cart;

const Title = styled.h2`
  ${GlobalStyle.sub_title};
  margin-top: 0;
  margin-bottom: 10px;
`;

const FancyOption = styled.option`
  cursor: pointer;
`;

const ButtonStyled = styled.button`
  margin: 0 10px 20px 10px;
  background-color: white;
  border: 2px solid black;
  box-shadow: 2px 2px 1px 2px #8888;
  width: 50px;
  height: 40px;
  transition: 0.3s;
  &:hover{
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)
  }
  &:focus{
    background-color: black;
    color: white;
  }
`;

const Dropdown = styled.select`
  border: 2px solid black;
  margin: 0 10px 10px 10px;
  min-width: 140px;
  height: 40px;
`;
