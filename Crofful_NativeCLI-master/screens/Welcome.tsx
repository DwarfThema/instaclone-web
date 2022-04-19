import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import BgLogo from "../components/BgLogo";
import { buttonTheme } from "../styles";

const LoginLink = styled.Text`
  color: ${buttonTheme.fontColor};
  margin-top: 10px;
  font-size: 15px;
  font-weight: 900;
`;

const Welcome = ({ navigation }: any) => {
  const goToCreateAccount = () => navigation.navigate("회원가입");
  const goToLogin = () => navigation.navigate("로그인");
  return (
    <AuthLayout>
      <AuthButton
        disabled={false}
        text="회원가입"
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
