import styled from 'styled-components';

const ContentWrapper = styled.div({
  fontSize: '1.5rem',
  'h2,h3,h4,p,ul': {
    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },

  img: {
    height: 'auto',
    display: 'block',
    margin: ' 0 auto',
  },
});

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Content;
