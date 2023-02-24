import { StyledButton } from './Button.styled';
// import PropTypes from 'prop-types';

export const Button = ({ text, onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
};
