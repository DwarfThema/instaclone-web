import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
  color: ${(p) => p.theme.fontColor};
`;

const Container = styled.div``;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
    </Container>
  );
};

export default Login;
