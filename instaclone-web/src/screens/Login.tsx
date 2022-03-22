import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${(p) => p.theme.borderColor};
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(p) => p.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(p) => p.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(p) => p.theme.accent};
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Seperator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 2px;
    background-color: ${(p) => p.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #40588a;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <Input type="text" placeholder="아이디" />
            <Input type="text" placeholder="비밀번호" />
            <Button type="submit" value="로그인" />
          </form>
          <Seperator>
            <div></div>
            <span>OR</span>
            <div></div>
          </Seperator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            <span>Facebook 으로 로그인 하세요</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>아이디가 없으신가요?</span>
          <Link to="/sign-up">가입하기</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
