import styled from 'styled-components';

const ContentWrapper = styled.div({
  'h2,h3,h4,p,ul': {
    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },
});

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Content;
