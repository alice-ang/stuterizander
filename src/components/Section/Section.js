import styled from 'styled-components';
import { Breakpoints } from 'styles';

const SectionWrapper = styled.section({
  width: '100%',

  margin: 0,
  padding: 0,
  [Breakpoints.Medium]: {
    padding: '2rem 0',
  },
});

const Section = ({ className, children, ...rest }) => {
  return (
    <SectionWrapper className={className} {...rest}>
      {children}
    </SectionWrapper>
  );
};

export default Section;
