import styled from 'styled-components';
import { Breakpoints } from 'styles';

const HeroContainer = styled.div({
  display: 'block',
  position: 'relative',
  textAlign: 'center',
  paddingBottom: '1em',
  [Breakpoints.Medium]: {
    padding: 0,
  },
});

const HeroText = styled.div({
  opacity: 1,
  width: '100%',
  color: 'white',
  margin: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 4,
});

const HeroImage = styled.img({
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  maxHeight: 500,
});
const Overlay = styled.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  opacity: 0.2,
  zIndex: 3,
});

const Hero = ({ image, title, subtitle }) => {
  return (
    <HeroContainer>
      <HeroImage src={image.sourceUrl} alt={image.altText} srcSet={image.srcSet} width="100%" />
      {title && (
        <HeroText>
          <h2>{title ?? null}</h2>
          <h5>{subtitle ?? null}</h5>
        </HeroText>
      )}
      {title && <Overlay />}
    </HeroContainer>
  );
};
export default Hero;
