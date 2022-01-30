import styled from 'styled-components';
import { Breakpoints } from 'styles';

const ContainerWrapper = styled.div({
  padding: '0 1rem',
  margin: '0 auto',

  [Breakpoints.Large]: {
    maxWidth: '70%',
  },
});

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
