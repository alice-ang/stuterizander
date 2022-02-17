import styled from 'styled-components';
import { Breakpoints } from 'styles';

const ImageWrapper = styled.figure(({ isFeatured }) => ({
  margin: isFeatured ? 'auto' : 0,
  width: 'fit-content',
  height: 'fit-content',
  [Breakpoints.Medium]: {
    width: isFeatured ? 'fit-content' : '100%',
    height: isFeatured ? 'fit-content' : '100%',
  },
  div: {
    overflow: 'hidden',
    margin: 0,
  },
  p: {
    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginTop: 0,
    },
  },
  img: {
    width: '100%',
    maxHeight: isFeatured ? 300 : undefined,
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    [Breakpoints.Medium]: {
      maxHeight: isFeatured ? 500 : undefined,
    },
  },
  figcaption: {
    color: 'grey',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '1em',
  },
}));

const Image = ({ children, src, alt, srcSet, dangerouslySetInnerHTML, isFeatured }) => {
  return (
    <ImageWrapper isFeatured={isFeatured}>
      <div>
        <img src={src} alt={alt || ''} srcSet={srcSet} />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </ImageWrapper>
  );
};

export default Image;
