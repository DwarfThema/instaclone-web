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
import { useForm, useFormState } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #40588a;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface IForm {
  username: string;
  password: string;
  hasError: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: "onChange" });

  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <Input
            {...register("username", {
              required: "아이디를 입력해 주세요.",
              minLength: { value: 5, message: "5글자 이상 입력해주세요." },
            })}
            type="text"
            placeholder="아이디"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "비밀번호를 입력해 주세요." })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value="로그인" disabled={!isValid} />
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
