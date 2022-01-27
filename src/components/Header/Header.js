import Container from 'components/Container';

import styled from 'styled-components';

const HeaderWrapper = styled.header({
  h1: {
    margin: 0,
    lineHeight: 1.15,
    textAlign: 'center',

    a: {
      color: 'tomato',
      textDecoration: 'none',

      ['&:hover,&:focus,&:active']: {
        textDecoration: 'underline',
      },
    },

    ' & + ul': {
      marginTop: '1.5em',
    },
  },
  p: {
    ' &:last-child': {
      marginBottom: 0,
    },
    figure: {
      marginLeft: '-2rem',
      marginRight: '-2rem',
    },
  },
});

const Header = ({ children }) => {
  return (
    <HeaderWrapper>
      <Container>{children}</Container>
    </HeaderWrapper>
  );
};

export default Header;
