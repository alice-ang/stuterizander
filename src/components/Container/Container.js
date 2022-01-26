import styled from 'styled-components';

const ContainerWrapper = styled.div({
  maxWidth: '60rem',
  padding: '0 2rem',
  margin: '0 auto',
});

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
