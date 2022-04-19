import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { mainTheme } from "../styles";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../components/BackIcon";

const Stack = createNativeStackNavigator();

const MessagesNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackIcon name="chevron-back" />,
      }}
    >
      <Stack.Screen name="대화방들" component={Rooms} />
      <Stack.Screen name="대화방" component={Room} />
    </Stack.Navigator>
  );
};

export default MessagesNav;
