import React from 'react'
import styled from 'styled-components';

const RateDiv = styled.div`
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  padding: 0rem 0.35rem;
  margin-left: 0.35rem;
  > span {
    margin: 0rem  0.2rem;
  }
  @media screen and (min-width: 320px) and (max-width: 767px){
      margin: 0rem 0.25rem;
      font-size: 0.9rem;
  }
`;
const Rating = ({ value, color }) => {
  return (
    <RateDiv>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    </RateDiv>
  )
}

Rating.defaultProps = {
  color: '#ffc800',
}

export default Rating