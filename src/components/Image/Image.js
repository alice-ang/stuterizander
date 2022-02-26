import styled from 'styled-components';
import { Breakpoints } from 'styles';

const ImageWrapper = styled.figure(({ isFeatured }) => ({
  margin: isFeatured ? 'auto' : 0,
  width: isFeatured ? '100%' : 'fit-content',
  height: 'fit-content',
  p: {
    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginTop: 0,
    },
  },
  img: {
    maxHeight: isFeatured ? 300 : undefined,
    height: '100%',
    objectFit: isFeatured ? 'contain' : 'cover',
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
      <img src={src} alt={alt || ''} srcSet={srcSet} />

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
