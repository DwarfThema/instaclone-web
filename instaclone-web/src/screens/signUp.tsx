import styled from "styled-components";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const signUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>로그인 해서 친구들의 사진과 비디오를 감상하세요.</Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="이메일" />
          <Input type="text" placeholder="이름" />
          <Input type="text" placeholder="아이디" />
          <Input type="text" placeholder="비밀번호" />
          <Button type="submit" value="로그인" />
        </form>
      </FormBox>
      <BottomBox
        cta="아이디가 있으신가요?"
        link={routes.home}
        linkText="로그인 하기"
      />
    </AuthLayout>
  );
};

export default signUp;
