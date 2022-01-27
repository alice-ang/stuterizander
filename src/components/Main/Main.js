import styled from 'styled-components';

const MainWrapper = styled.main({
  paddingTop: '2em',
  backgroundColor: '#f7f7f7',
});
const Main = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;
