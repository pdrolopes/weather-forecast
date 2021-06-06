import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border-radius: 10px;
  vertical-align: middle;
  cursor: pointer;
  border: 0;
  background: #4a93cc;
  color: white;
  transition: filter 200ms;

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(110%);
  }
`;

export default Button;
