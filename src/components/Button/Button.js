import styled from 'styled-components';

const StyledButton = styled.button({
  color: 'white',
  fontFamily: 'inherit',
  fontWeight: 700,
  backgroundColor: 'tomto',
  padding: ' 0.8em 1.4em',
  borderRadius: 5,
  border: 0,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
});

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
