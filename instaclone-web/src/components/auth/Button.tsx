import styled from "styled-components";

const SButton = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(p) => p.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

const Button = (props: any) => {
  return <SButton {...props} />;
};

export default Button;
