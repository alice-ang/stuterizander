import styled from 'styled-components';

const ImageWrapper = styled.figure({
  margin: 0,
  width: '100%',
  height: '100%',
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
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  figcaption: {
    color: 'grey',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '1em',
  },
});

const Image = ({ children, src, alt, srcSet, dangerouslySetInnerHTML }) => {
  return (
    <ImageWrapper>
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
