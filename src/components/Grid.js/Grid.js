import styled from 'styled-components';
import { Breakpoints } from 'styles';
import Content from 'components/Content';

const GridTitle = styled.h2({
  textTransform: 'capitalize',
});

const ProductGrid = styled.div({
  display: 'grid',
  gridAutoRows: '120px 120px',
  gridGap: 5,
  gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
  gridA0utoFlow: 'dense',
  [Breakpoints.Large]: {
    gridGap: 10,
    gridAutoRows: '200px 200px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
  },

  [Breakpoints.Large]: {
    gridGap: 20,
    gridAutoRows: '300px 300px',
    gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
  },
});

const Grid = ({ title, children }) => {
  return (
    <Content>
      {title && <GridTitle>{title}</GridTitle>}
      <ProductGrid>{children}</ProductGrid>
    </Content>
  );
};
export default Grid;
