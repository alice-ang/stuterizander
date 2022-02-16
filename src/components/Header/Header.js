import Container from 'components/Container';

import styled from 'styled-components';
import { theme } from 'styles';

const HeaderWrapper = styled.header({
  h1: {
    margin: 0,
    lineHeight: 1.15,
    textAlign: 'center',
    a: {
      textDecoration: 'none',

      ['&:hover,&:focus,&:active']: {
        color: theme.brand.link,
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

const Header = ({ className, children }) => {
  return (
    <HeaderWrapper className={className}>
      <Container>{children}</Container>
    </HeaderWrapper>
  );
};

export default Header;
