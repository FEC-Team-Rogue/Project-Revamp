import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useData } from '../SharedContexts/DataProvider';
import { useRatingData } from '../SharedContexts/RatingProvider';
import styled from 'styled-components';
import axios from 'axios';

function StarsRating({ value, productId, showAverage, relatedProduct, currentProduct}) {

  const { reviews, getReviews, meta } = useRatingData()
  const [results, setResults] = useState(null);
  const [average, setAverage] = useState(0);

  // ----- Austin's copy pasta ----
  if (relatedProduct) {
    useEffect(() => {
      const query = { product_id: relatedProduct };
      axios.get('/reviews/meta', { params: query })
        .then((response) => {
          setResults(response.data);
        });
      return setResults();
    }, [productId]);
  }

  if (currentProduct) {
    useEffect(() => {
      if (meta && typeof meta === 'object') {
        setResults(meta.ratings)
      }
    }, [meta])
  }
  if (value) {
    useEffect(() => {
      if (meta && typeof meta === 'object') {
        setAverage(value * 20)
      }
    }, [meta])
  }

  function calcPercent() {
    if (results) {
      const entries = Object.entries(results);
      let total = 0;
      let submits = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (let [key, val] of entries) {
        key = Number(key);
        val = Number(val);
        total += (key * val);
        submits += val;
      }
      const avg = total / submits;

      setAverage(avg.toFixed(1));
      return Math.round((avg / 5) * 100, 2);
    }
  }
  const percent = useMemo(() => calcPercent(), [results]);
  const styleStar = {
    width: value ? `${average}%` : `${percent}%`,
  };

  return (
    <>
      <Container>
      <Average>{showAverage ? <h1>{average}</h1> : null}</Average>
        <StarRatingContainer>
          <StarRatingTop style={styleStar}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></StarRatingTop>
          <StarRatingBottom><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></StarRatingBottom>
        </StarRatingContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
`
const StarRatingContainer = styled.div`
  z-index: 0;
  unicode-bidi: bidi-override;
  color: #363636bf;
  width: max-width;

  margin: 0 auto;
  position: relative;
  padding: 0;
  text-shadow: 0px 1px 0 #a2a2a2;
`
const StarRatingTop = styled.div`
  color: #f1e312;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  overflow: hidden;
`

const StarRatingBottom = styled.div`
  padding: 0;
  display: block;
  z-index: 0;
`
const Average = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default StarsRating;