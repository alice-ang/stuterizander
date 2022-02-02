import styled from 'styled-components';

const MainWrapper = styled.main({
  padding: '2em 0px',
  backgroundColor: '#f7f7f7',
});
const Main = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;
