import styled from "styled-components";

const Button = styled.input`
  border: none;
  border-radius: 5px;
  margin-top: 12px;
  background-color: ${(p) => p.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(p) => (p.disabled ? "0.2" : "1")};
`;

export default Button;
