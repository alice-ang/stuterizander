import { useState } from 'react';
import styled from 'styled-components';
import { Breakpoints } from '../../styles';
import Image from 'components/Image';

const GridWrapper = styled.div({
  maxWidth: '100%',
  [Breakpoints.Medium]: {
    maxWidth: '70%',
  },
});

const MainImage = styled.div`
  grid-area: main;
  cursor: default;
  align-self: baseline;
`;

const ImageContainer = styled.div`
  display: grid;
  align-items: end;
  grid-gap: 0.3rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fit, minmax(max-content, 1fr));
  grid-template-areas:
    '. . .'
    '. . .'
    'main main main'
    'main main main'
    'main main main';
  cursor: pointer;
`;

const ImageGrid = ({ images }) => {
  const [mainUrl, setMainUrl] = useState(images[0].sourceUrl);
  console.log(images);
  return (
    <GridWrapper>
      <ImageContainer>
        {images &&
          Object.values(images).map((image) => {
            return (
              <span
                key={image.sourceUrl}
                onClick={() => {
                  setMainUrl(image.sourceUrl);
                }}
              >
                <Image {...image} src={image.sourceUrl} dangerouslySetInnerHTML={image.caption} alt="bildgalleri" />
              </span>
            );
          })}
        <MainImage>
          <Image
            {...Object.values(images)[0]}
            src={mainUrl}
            dangerouslySetInnerHTML={Object.values(images)[0].caption}
          />
        </MainImage>
      </ImageContainer>
    </GridWrapper>
  );
};
export default ImageGrid;
