import styled from 'styled-components';

const SectionWrapper = styled.section({
  width: '100%',
  padding: '2rem 0',
  margin: ' 3rem 0',
});

const Section = ({ className, children, ...rest }) => {
  return (
    <SectionWrapper className={className} {...rest}>
      {children}
    </SectionWrapper>
  );
};

export default Section;
