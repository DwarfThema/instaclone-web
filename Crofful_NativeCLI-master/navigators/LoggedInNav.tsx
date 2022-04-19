import useMe from "../hooks/useMe";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { mainTheme } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MessagesNav from "./MessagesNav";

const Stack = createNativeStackNavigator();

const LoggedInNav = () => {
  const { data } = useMe();
  const navigation: any = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="탭"
        options={{ presentation: "modal", headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="업로드"
        options={{ presentation: "modal", headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="업로드폼"
        component={UploadForm}
        options={{
          presentation: "fullScreenModal",
          headerTitle: "업로드",
          headerBackVisible: true,
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.goBack()}
              color={mainTheme.mainColor}
              name="close"
              size={28}
              style={{ left: -10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="메세지"
        options={{
          headerShown: false,
        }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
