import React, { useEffect } from "react";
import { Text, View } from "react-native";

const SomeProfile = ({ navigation, route }: any) => {
  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.userName,
    });
  }, [route]);
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>SomeProfile</Text>
    </View>
  );
};

export default SomeProfile;
