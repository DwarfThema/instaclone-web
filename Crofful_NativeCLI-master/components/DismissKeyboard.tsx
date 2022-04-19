import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

const DismissKeyboard = ({ children }: any) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web" ? true : false}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
