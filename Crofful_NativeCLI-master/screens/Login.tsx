import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = ({ route }: any) => {
  const onCompleted = async (data: any) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: route?.params?.password,
      userName: route?.params?.userName,
    },
  });

  useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
  }, [register]);

  const onValid = (data: any) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const loginIdRef = useRef(null);
  const loginPassRef = useRef(null);

  const onNext = (nextRef: any) => {
    handleSubmit(onValid);
    nextRef?.current?.focus();
  };
  return (
    <AuthLayout>
      <TextInput
        value={watch("userName")}
        autoFocus
        ref={loginIdRef}
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={() => onNext(loginPassRef)}
        onChangeText={(text) => setValue("userName", text)}
      />
      <TextInput
        value={watch("password")}
        ref={loginPassRef}
        secureTextEntry
        placeholder="비밀번호"
        placeholderTextColor="gray"
        returnKeyType="next"
        autoCorrect={false}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("userName") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;
AuthLayout;
