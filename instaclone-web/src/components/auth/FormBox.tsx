import styled from "styled-components";
import { BaseBox } from "../shared";

type Props = {
  children: React.ReactNode;
};

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FormBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
export default FormBox;
