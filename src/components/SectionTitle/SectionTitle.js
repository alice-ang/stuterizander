import styled from 'styled-components';

const SectionTitleWrapper = styled.h2({
  color: 'grey',
  fontWeight: 'normal',
  paddingBottom: '1em',
  borderBottom: 'solid 1px grey',
  marginTop: 0,
});

const SectionTitle = ({ children }) => {
  return <SectionTitleWrapper>{children}</SectionTitleWrapper>;
};

export default SectionTitle;
