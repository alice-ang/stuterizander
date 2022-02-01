import styled from 'styled-components';
import { Breakpoints } from 'styles';
import Content from 'components/Content';

const GridTitle = styled.h2({
  textTransform: 'capitalize',
});

const ProductGrid = styled.div({
  display: 'grid',
  gridAutoRows: '120px 120px',
  gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`,
  gridGap: '0.5em',
  margin: 0,
  borderRadius: 5,
  [Breakpoints.Medium]: {
    gridAutoRows: '200px 200px',
    gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
    gridGap: '1em',
  },
  [Breakpoints.XL]: {
    gridAutoRows: '300px 300px',
    gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
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
