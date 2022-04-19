import React from "react";
import { ActivityIndicator, View } from "react-native";
import { mainTheme } from "../styles";

const ScreenLayout = ({ loading, children }: any) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color={mainTheme.mainColor} size="large" />
      ) : (
        children
      )}
    </View>
  );
};

export default ScreenLayout;
