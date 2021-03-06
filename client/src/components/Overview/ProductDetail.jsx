import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../GlobalStyle';
import StarRating from '../SharedComponents/StarRating';
import { useOverview } from '../SharedContexts/OverviewProvider';
import RatingProvider from '../SharedContexts/RatingProvider';

function ProductDetail() {
  const { prodDetails } = useOverview();
  const { currentStyle } = useOverview();

  return (
    <div className="ProductDetails">
      {prodDetails && currentStyle && (
        <div className="ProductDetails">
          <Category>{prodDetails.category}</Category>
          <Title>{prodDetails.name}</Title>
          <Price>
            {currentStyle.sale_price
              ? (
                <P>
                  <s>{`$${currentStyle.original_price}`}</s>
                  {` $${currentStyle.sale_price}`}
                </P>
              )
              : (
                <P>
                  {`$${currentStyle.original_price}`}
                </P>
              )}
          </Price>
          <RatingProvider>
            <StarContainer>
              <StarRating currentProduct />
            </StarContainer>
          </RatingProvider>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

const Title = styled.h1`
  ${GlobalStyle.title};
  margin: 0 0 10px 0;
`;

const Category = styled.h2`
  ${GlobalStyle.para_sm};
  margin: 10px 0 10px 0;
`;

const Price = styled.div`
  ${GlobalStyle.para_title};
  margin: 0 0 10px 0;
`;

const P = styled.div`
  ${GlobalStyle.para_title};
  margin: 0 0 10px 10px;
`;

const StarContainer = styled.div`
  width: 0;
  margin: 0 0 25px 10px;
`;
