import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, mainTheme } from "../styles";
import StackNavFacotry from "./SharedStackNav";
import useMe from "../hooks/useMe";
import { Image, View } from "react-native";

const Tabs = createBottomTabNavigator();

const TabsNav = () => {
  const { data } = useMe();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: `${lightTheme.accent}`,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="피드"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <StackNavFacotry screenName="피드" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="찾기"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-search-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <StackNavFacotry screenName="찾기" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="추가"
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("업로드");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={size + 15}
              color={color}
            />
          ),
        }}
      >
        {() => <StackNavFacotry screenName="추가" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="알림"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-notifications-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => <StackNavFacotry screenName="알림" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="내프로필"
        options={{
          title: "🫥",
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data?.me?.avatar }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  ...(focused && {
                    borderColor: `${mainTheme.mainColor}`,
                    borderWidth: 1.5,
                  }),
                }}
              />
            ) : (
              <Ionicons name="ios-person-outline" size={size} color={color} />
            ),
        }}
      >
        {() => <StackNavFacotry screenName="내프로필" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default TabsNav;
