import { useNavigation } from "@react-navigation/native";
import React from "react";
import { mainTheme } from "../styles";
import { Ionicons } from "@expo/vector-icons";

const BackIcon = ({ name }: any) => {
  const navigation: any = useNavigation();

  return (
    <Ionicons
      onPress={() => navigation.goBack()}
      color={mainTheme.mainColor}
      name={name}
      size={28}
      style={{ left: -10 }}
    />
  );
};

export default BackIcon;
