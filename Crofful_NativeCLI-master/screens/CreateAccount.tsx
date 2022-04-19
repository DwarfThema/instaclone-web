import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

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

const CreateAccount = ({ navigation }: any) => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onCompleted = (data: any) => {
    const {
      createAccount: { ok },
    } = data;
    const { userName, password } = getValues();
    if (ok) {
      navigation.navigate("로그인", {
        userName,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
    register("nickName", { required: true });
    register("realName", { required: true });
    register("email", { required: true });
  }, [register]);

  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nicknameRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const onNext = (nextRef: any) => {
    handleSubmit(onValid);
    nextRef?.current?.focus();
  };
  const onValid = (data: any) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          userName: data.userName,
          password: data.password,
          lastName: data.nickName,
          firstName: data.realName,
          email: data.email,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        ref={idRef}
        placeholder="아이디"
        placeholderTextColor="gray"
        keyboardType="name-phone-pad"
        returnKeyType="next"
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("userName", text)}
      />
      <TextInput
        ref={passwordRef}
        secureTextEntry
        placeholder="비밀번호"
        placeholderTextColor="gray"
        keyboardType="name-phone-pad"
        returnKeyType="next"
        autoCorrect={false}
        onSubmitEditing={() => onNext(nicknameRef)}
        onChangeText={(text) => setValue("password", text)}
      />
      <TextInput
        ref={nicknameRef}
        placeholder="닉네임"
        placeholderTextColor="gray"
        keyboardType="name-phone-pad"
        returnKeyType="next"
        autoCorrect={false}
        onSubmitEditing={() => onNext(nameRef)}
        onChangeText={(text) => setValue("nickName", text)}
      />
      <TextInput
        ref={nameRef}
        placeholder="성함"
        placeholderTextColor="gray"
        keyboardType="name-phone-pad"
        returnKeyType="next"
        autoCorrect={false}
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("realName", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="이메일"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="done"
        autoCorrect={false}
        onSubmitEditing={onValid}
        lastOne={true}
        onChangeText={(text) => setValue("email", text)}
      />
      <AuthButton
        text="회원가입"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
