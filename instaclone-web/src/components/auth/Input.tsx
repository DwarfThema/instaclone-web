import { any } from "prop-types";
import styled from "styled-components";

interface IProp {
  hasError?: any;
}

const Input = styled.input<IProp>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(p) => (p.hasError ? "red" : p.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(p) => (p.hasError ? "red" : "rgb(38, 38, 38)")};
  }
`;

export default Input;
