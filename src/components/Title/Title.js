import styled from 'styled-components';

const TitleWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',

  img: {
    width: '1.4em',
    height: 'auto',
    borderRadius: '50%',
    marginBottom: '0.3em',
  },
});

const Title = ({ title, thumbnail }) => {
  return (
    <TitleWrapper>
      {thumbnail && <img src={thumbnail.url} alt="" aria-hidden="true" />}
      <span>{title}</span>
    </TitleWrapper>
  );
};

export default Title;
