import styled from 'styled-components';

const ImageWrapper = styled.figure({
  margin: 0,
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
    objectFit: 'cover',
  },
  figcaption: {
    color: 'grey',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '1em',
  },
});

const Image = ({ children, width = '100%', height = 'auto', src, alt, srcSet, dangerouslySetInnerHTML }) => {
  return (
    <ImageWrapper>
      <div>
        <img width={width} height={height} src={src} alt={alt || ''} srcSet={srcSet} />
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
