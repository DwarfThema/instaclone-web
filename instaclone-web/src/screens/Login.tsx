import styled from "styled-components";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";

const FacebookLogin = styled.div`
  color: #40588a;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data: any) => {
    console.log(data, "valid");
  };
  const onSubmitinValid = (data: any) => {
    console.log(data, "invalid");
  };
  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitinValid)}>
          <Input
            {...register("username", {
              required: "아이디를 입력해 주세요.",
              minLength: { value: 5, message: "5글자 이상 입력해주세요." },
              validate: (currentValue) => currentValue.includes("potato"),
            })}
            type="text"
            placeholder="아이디"
          />
          <Input
            {...register("password", { required: "비밀번호를 입력해 주세요." })}
            type="password"
            placeholder="비밀번호"
          />
          <Button type="submit" value="로그인" />
        </form>
        <Seperator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          <span>Facebook 으로 로그인 하세요</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="아이디가 없으신가요?"
        link={routes.signUp}
        linkText="가입하기"
      />
    </AuthLayout>
  );
};

export default Login;
