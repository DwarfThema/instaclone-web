import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import BgLogo from "../BgLogo";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Logo = styled.Image`
  height: 70px;
  width: 100%;
  max-width: 80%;
  margin-bottom: 30px;
`;

const AuthLayout = ({ children }: any) => {
  return (
    <DismissKeyboard>
      <Container>
        <BgLogo />
        <KeyboardAvoidingView
          style={{
            width: "100%",
            alignItems: "center",
          }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/crofful_logo_Wt.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};

export default AuthLayout;
