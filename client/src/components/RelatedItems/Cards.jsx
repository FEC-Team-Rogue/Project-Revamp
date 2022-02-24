import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../SharedContexts/DataProvider';
import RemoveOutfit from './RemoveOutfit';
import css from './Carousel.css';
import StarsRating from '../SharedComponents/StarRating';
import AddOutfit from './AddOutfit';
import CompareButton from './CompareButton';
import { MedText, SmText } from './RelatedItemsCSS';

function Cards(props) {
  const { item } = props;
  const { view } = props;
  const { setProductId } = useData();
  const [relatedView] = useState(view);

  let render;
  if (relatedView) {
    render = (
      <>
        <AddOutfit item={item} />
        <CompareButton item={item} />
      </>
    );
  } else {
    render = (
      <RemoveOutfit item={item} />
    );
  }

  let price;
  if (item.sale_price) {
    price = (
      <>
        <div className={css.saleprice}>{`$${item.sale_price}`}</div>
        &nbsp;
        <div className={css.originalPriceStriked}>{`$${item.original_price}`}</div>
      </>
    );
  } else {
    price = (
      <div>{`$${item.original_price}`}</div>
    );
  }
  return (
    <div>
      <CardContainer>
        {render}
        <CardInfoContainer onClick={() => setProductId(item.id)}>
          <ImgContainer src={item.thumbnail} alt="Item" />
          <CardInfoHolder>
            <SmText>
              {item.category}
            </SmText>
            <MedText>
              {item.name}
            </MedText>
            <PriceContainer>
              {price}
            </PriceContainer>
            <StarsRating relatedProduct={item.id} />
          </CardInfoHolder>
        </CardInfoContainer>
      </CardContainer>
    </div>
  );
}

export default Cards;

const PriceContainer = styled.div`
  font-size: 11px;
  font-weight: 200;
  display: flex;
  flex-direction: row;
`;

const CardInfoHolder = styled.div`
  padding-left: 8px;
  padding-bottom: 7px;
`;

const ImgContainer = styled.img`
  object-fit: cover;
  width:230px;
  height:230px;
  overflow: clip;
`;

const CardInfoContainer = styled.div`
  box-shadow: rgb(0 0 0 / 12%) 4px 4px 4px 0px;
`;

export const CardContainer = styled.div`
  padding: 8px;
  width: 230px;
`;
