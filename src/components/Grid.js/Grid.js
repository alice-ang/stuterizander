import styled from 'styled-components';
import { Breakpoints } from 'styles';
import Content from 'components/Content';

const GridTitle = styled.h2({
  textTransform: 'capitalize',
});

const ProductGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(120px, 1fr))`,
  gridGap: '0.5em',
  margin: 0,
  borderRadius: 5,
  [Breakpoints.Large]: {
    gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
    gridGap: '1em',
  },
  [Breakpoints.XL]: {
    gridTemplateColumns: `repeat(auto-fit, minmax(230px, 1fr))`,
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
