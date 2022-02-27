import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Prev = styled.button({
  outline: 0,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  transform: 'translateY(-50%)',
  border: 0,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  fill: '#1bcacd',
  padding: 0,

  left: 27,
});

const Next = styled.button({
  outline: 0,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  transform: 'translateY(-50%)',
  border: 0,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  fill: '#1bcacd',
  padding: 0,
  right: 27,
});

export const PrevButton = ({ enabled, onClick }) => (
  <Prev className="embla__button embla__button--prev" onClick={onClick} disabled={!enabled}>
    <FaAngleLeft size={40} color="#fff" />
  </Prev>
);

export const NextButton = ({ enabled, onClick }) => (
  <Next className="embla__button embla__button--next" onClick={onClick} disabled={!enabled}>
    <FaAngleRight size={40} color="#fff" />
  </Next>
);
