import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { buttonTheme } from "../../styles";

const Button = styled.TouchableOpacity`
  background-color: ${buttonTheme.bgColor};
  padding: 12px 10px;
  border-radius: 5px;
  width: 80%;
  margin-top: 5px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const ButtonText = styled.Text`
  color: ${buttonTheme.fontColor};
  font-size: 15px;
  font-weight: 900;
  text-align: center;
`;

const AuthButton = ({ text, disabled, onPress, loading }: any) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text} </ButtonText>
      )}
    </Button>
  );
};

export default AuthButton;
