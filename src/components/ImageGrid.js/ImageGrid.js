import { useState } from 'react';
import styled from 'styled-components';
import { Breakpoints } from '../../styles';
import Image from 'components/Image';

const MainImage = styled.div`
  grid-area: main;
  cursor: default;
`;
const ImageContainer = styled.div`
  display: grid;
  grid-gap: 0.3rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    '. . .'
    'main main main'
    'main main main'
    'main main main';

  cursor: pointer;
  ${Breakpoints.Large}: {
    grid-gap: 1rem;
  }
`;

const ImageGrid = ({ images }) => {
  const [mainUrl, setMainUrl] = useState(Object.values(images)[1].sourceUrl);

  return (
    <ImageContainer>
      <MainImage>
        <Image {...Object.values(images)[0]} src={mainUrl} dangerouslySetInnerHTML={Object.values(images)[0].caption} />
      </MainImage>

      {Object.values(images).map((image) => {
        if (!image.sourceUrl) {
          return null;
        }
        return (
          <span
            key={image.sourceUrl}
            onClick={() => {
              setMainUrl(image.sourceUrl);
            }}
          >
            <Image {...image} src={image.sourceUrl} dangerouslySetInnerHTML={image.caption} />
          </span>
        );
      })}
    </ImageContainer>
  );
};
export default ImageGrid;
