import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { theme } from 'styles';

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
  justifyContent: 'center',
  alignItems: 'center',
  fill: '#1bcacd',
  padding: 0,
  left: 0,
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
  justifyContent: 'center',
  alignItems: 'center',
  fill: '#1bcacd',
  padding: 0,
  right: 0,
});

export const PrevButton = ({ enabled, onClick }) => (
  <Prev className="embla__button embla__button--prev" onClick={onClick} disabled={!enabled}>
    <FaAngleLeft size={40} color={theme.text.neutral} />
  </Prev>
);

export const NextButton = ({ enabled, onClick }) => (
  <Next className="embla__button embla__button--next" onClick={onClick} disabled={!enabled}>
    <FaAngleRight size={40} color={theme.text.neutral} />
  </Next>
);
