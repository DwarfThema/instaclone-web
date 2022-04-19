import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Comments from "../screens/Comments";
import Feed from "../screens/Feed";
import Likes from "../screens/Likes";
import MeProfile from "../screens/MeProfile";
import Notification from "../screens/Notification";
import PhotoScreen from "../screens/PhotoScreen";
import Search from "../screens/Search";
import SomeProfile from "../screens/SomeProfile";

const Stack = createNativeStackNavigator();

const LogoImage = styled.Image`
  position: absolute;
  max-width: 120px;
  right: 60px;
`;

const SharedStackNav = ({ screenName }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: `gray`,
        headerStyle: { backgroundColor: "white" },
        headerShadowVisible: true,
      }}
    >
      {screenName === "피드" ? (
        <Stack.Screen
          name="탭피드"
          component={Feed}
          options={{
            headerTitle: () => (
              <LogoImage
                resizeMode="contain"
                source={require("../assets/crofful_Ologo_blue.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "찾기" ? (
        <Stack.Screen name="탭찾기" component={Search} />
      ) : null}
      {screenName === "알림" ? (
        <Stack.Screen name="탭알림" component={Notification} />
      ) : null}
      {screenName === "내프로필" ? (
        <Stack.Screen
          name="탭내프로필"
          options={{ title: "🫥" }}
          component={MeProfile}
        />
      ) : null}
      <Stack.Screen
        name="타인프로필"
        options={{ title: "🫥" }}
        component={SomeProfile}
      />
      <Stack.Screen name="사진" component={PhotoScreen} />
      <Stack.Screen name="좋아요" component={Likes} />
      <Stack.Screen name="댓글" component={Comments} />
    </Stack.Navigator>
  );
};

export default SharedStackNav;
