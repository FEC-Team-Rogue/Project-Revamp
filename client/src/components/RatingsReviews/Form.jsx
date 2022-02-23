import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { addReviews } from '../SharedContexts/RatingProvider';
import { useRatingData } from '../SharedContexts/RatingProvider';
import { useOverview } from '../SharedContexts/OverviewProvider';
import Characteristics from './Characteristics';
import StarClick from './StarClick';

function Form() {
  const { addReviews } = useRatingData();
  const { meta } = useRatingData();
  const { prodDetails } = useOverview();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    summary: '',
    body: '',
    recommend: true,
    photos: [],
    characteristics: {},
    rating: ''
  });

  const handleSubmit = (e) => {
    event.preventDefault();
    console.log('form data from handlesubmit', formData)
    addReviews(formData);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData, [event.target.name]: event.target.value
    })
  }
  const handleRadio = (e) => {
    const isChecked = e.currentTarget.value === 'true' ? true : false;
    // formData.recommend = isChecked;
    setFormData({
      ...formData, [event.target.name]: isChecked
    })
  }
  const addRating = (rate) => {
    console.log('add rating clicked', rate)
    if (rate) {
      setFormData({
        ...formData, rating: Number(rate)
      })
    }
    console.log('rate updated', formData)
  }

  const sendCharacteristics = (characteristicsFrom) => {
    setFormData({
      ...formData, characteristics: characteristicsFrom
    })
    console.log('form data', formData)
  }

  const getMetaIds = () => {
    const metaIds = {}
    const entries = Object.entries(meta.characteristics);
    for (let [key, val] of entries) {
      metaIds[val.id] = 0
    }
    return metaIds;
  }

  useEffect(() => { }, [formData])

  return (
    <>
      <StarClick addRating={addRating} />
      <FormStyle onSubmit={handleSubmit}>
        <h1>Write Your Review</h1>
        <p>About {prodDetails.name}</p>
        <GridContainer>
          <Label>
            <LabelTitle>Email: <Required>*</Required></LabelTitle>
            <Input
              name="email"
              type="email"
              value={formData.email}
              placeholder="Example: jackson11@email.com"
              onChange={handleChange}
              required
              aria-hidden />
          </Label>
          <Label>
            <LabelTitle>Name: <Required>*</Required></LabelTitle>
            <Input
              name="name"
              type="name"
              value={formData.nickname}
              placeholder="Your Name"
              onChange={handleChange}
              required />
          </Label>
          <Label>
            <LabelTitle>Summary: </LabelTitle>
            <TextAreaSummary
              name="summary"
              type="summary"
              value={formData.summary}
              placeholder="“Example: Best purchase ever!”"
              onChange={handleChange}
              maxLength={60}
              required />
          </Label>
          <Label>
            <LabelTitle>Review: <Required>*</Required></LabelTitle>
            <TextAreaReview
              name="body"
              value={formData.body}
              placeholder="Why did you like the product or not?"
              onChange={handleChange}
              maxLength={1000}
              required />
          </Label>
        </GridContainer>
        <Recommend>
          Do you recommend this product? <Required>*</Required>
          <label>
            <input
              name="recommend"
              type="radio"
              value="true"
              defaultChecked={formData.recommend === true}
              onChange={handleRadio}
            />
            Yes
          </label>
          <label>
            <input
              name="recommend"
              type="radio"
              value="false"
              defaultChecked={formData.recommend === false}
              onChange={handleRadio}
            />
            No
          </label>
        </Recommend>
        <Characteristics meta={meta} metaIds={getMetaIds()} sendCharacteristics={sendCharacteristics} />
        <button onClick={handleSubmit}>Submit</button>
      </FormStyle>
    </>
  );
}

const FormStyle = styled.div`
  position: relevant;
  margin: 30px;
  flex-flow: column wrap;
`
const StarWrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  direction: rtl;
`
const GridContainer = styled.div`
  display: grid;

`
const Input = styled.input`
  width: 250px;
  height: 10px;
  padding: 8px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #d6d1d5;
`
const TextAreaReview = styled.textarea`
  height: 50px;
  width: 350px;
  padding: 10px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #d6d1d5;
`
const TextAreaSummary = styled.textarea`
  height: 20px;
  width: 350px;
  padding: 10px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #d6d1d5;
`
const LabelTitle = styled.span`
  padding: 5px 5px;
`
const Label = styled.label`
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`
const Recommend = styled.div`
  margin: 10px;
  padding: 10px;
`
const Required = styled.span`
  color: #e32;
  content: ' *';
  display:inline;
  padding-right: 5px;
`
export default Form;