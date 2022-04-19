import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";

const MeProfile = ({ navigation }: any) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.userName,
    });
  }, [data]);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text>MeProfile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MeProfile;
