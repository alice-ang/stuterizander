import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton } from './SliderButtons';
import styled from 'styled-components';

const Embla = styled.div({
  position: 'relative',
  backgroundColor: '#f7f7f7',
  padding: 20,
  maxWidth: 670,
  marginLeft: 'auto',
  marginRight: 'auto',
});

const Viewport = styled.div({
  overflow: 'hidden',
  width: '100%',
});

const Container = styled.div({
  display: 'flex',
  userSelect: 'none',
  '-webkit-touch-callout': 'none',
  '-khtml-user-select': 'none',
  '-webkit-tap-highlight-color': 'transparent',
  marginLeft: -10,
});

const Slide = styled.div({
  position: 'relative',
  minWidth: '100%',
  paddingLeft: 10,
});

const SlideInner = styled.div({
  position: 'relative',
  overflow: 'hidden',
  height: 399,

  figcaption: {
    position: 'absolute',
    padingTop: 15,
  },
});

const SlideImg = styled.img({
  position: 'absolute',
  display: 'block',
  top: '50%',
  left: '50%',
  width: 'auto',
  minHeight: '100%',
  minWidth: '100%',
  maxWidth: 'none',
  transform: 'translate(-50%, -50%)',
});

const ImageSlider = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <Embla>
      <Viewport ref={viewportRef}>
        <Container>
          {slides.map((slide, index) => (
            <Slide key={index}>
              {console.log(slide)}
              <figure>
                <SlideInner>
                  <SlideImg src={slide.sourceUrl} alt="bildgalleri" />
                </SlideInner>
                <figcaption
                  dangerouslySetInnerHTML={{
                    __html: slide.caption,
                  }}
                />
              </figure>
            </Slide>
          ))}
        </Container>
      </Viewport>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Embla>
  );
};

export default ImageSlider;
