import Container from 'components/Container';

import styled from 'styled-components';
import { Breakpoints } from 'styles';

const HeaderWrapper = styled.header({
  margin: '5rem 0',
  h1: {
    margin: 0,
    lineHeight: 1.15,
    fontSize: '3rem',
    textAlign: 'center',

    [Breakpoints.Small]: {
      fontSize: '4rem',
    },
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
