import Image from 'components/Image';
import styled from 'styled-components';
import { Breakpoints } from 'styles';

const Featured = styled(Image)({
  margin: '0 0 2em',
  div: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingTop: 'percentage(math.div(400, 960))',
  },

  img: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    border: 0,
    padding: 0,
    margin: 'auto',
    maxHeight: 500,
    [Breakpoints.Medium]: {
      objectFit: 'contain',
    },
  },
});

const FeaturedImage = ({ className, ...rest }) => {
  return <Featured className={className} {...rest} isFeatured />;
};

export default FeaturedImage;
