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

const ImageContainer = styled.div({
  display: 'grid',
  gridAutoRows: '200px 200px',
  gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
  gridGap: '0.5em',
  margin: 0,
  borderRadius: 5,
});

// const ImageContainer = styled.div`
//   display: grid;
//   align-items: end;
//   grid-gap: 0.3rem;
//   grid-template-columns: repeat(3, 1fr);
//   grid-template-rows: repeat(auto-fit, minmax(max-content, 1fr));
//   grid-template-areas:
//     '. . .'
//     '. . .'
//     'main main main'
//     'main main main'
//     'main main main';
//   cursor: pointer;
// `;

const ImageGrid = ({ images }) => {
  const [mainUrl, setMainUrl] = useState(images[0].sourceUrl);
  const [mainCaption, setMainCaption] = useState(images[0].caption);

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
                  setMainCaption(image.caption);
                }}
              >
                <Image {...image} src={image.sourceUrl} alt="bildgalleri" />
              </span>
            );
          })}
      </ImageContainer>
      <MainImage>
        <Image {...Object.values(images)[0]} src={mainUrl} dangerouslySetInnerHTML={mainCaption} />
      </MainImage>
    </GridWrapper>
  );
};
export default ImageGrid;
