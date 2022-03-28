import styled from "styled-components";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../generated/graphql";

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

interface IForm {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  hasError?: string;
  result?: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $userName: String!
    $lastName: String
    $firstName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      userName: $userName
      lastName: $lastName
      firstName: $firstName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<IForm>({ mode: "onChange" });

  const navigate = useNavigate();

  const onCompleted = (data: any) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
    const { userName, password } = getValues();
    navigate(routes.home, {
      state: {
        message: "가입을 완료했습니다. 로그인 해주세요.",
        userName,
        password,
      },
      replace: true,
    });
  };

  const [createAccount, { loading }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    const { userName, firstName, lastName, email, password } = data;
    createAccount({
      variables: {
        userName,
        firstName,
        lastName,
        email,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("userName", {
              required: "아이디를 작성해 주세요.",
            })}
            type="text"
            placeholder="아이디"
            hasError={Boolean(errors?.userName?.message)}
          />
          <Input
            {...register("lastName", {})}
            type="text"
            placeholder="성"
            hasError={Boolean(errors?.lastName?.message)}
          />
          <Input
            {...register("firstName", {
              required: "이름을 작성해 주세요.",
            })}
            type="text"
            placeholder="이름"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <Input
            {...register("email", {
              required: "이메일을 작성해 주세요.",
            })}
            type="text"
            placeholder="이메일"
            hasError={Boolean(errors?.email?.message)}
          />
          <Input
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
            })}
            type="text"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <Button
            type="submit"
            value={loading ? "가입중입니다." : "가입"}
            disabled={!isValid || loading || !isDirty}
          />
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

export default SignUp;
