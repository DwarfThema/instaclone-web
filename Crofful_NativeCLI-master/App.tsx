import AppLoading from "expo-app-loading";
import { useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { cache, isLoggedinVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";
import {
  AsyncStorageWrapper,
  CachePersistor,
  persistCache,
} from "apollo3-cache-persist";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  const isLoggedIn = useReactiveVar(isLoggedinVar);

  const preloadAsset = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map((font: any) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/crofful_logo_gra.png")];
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all<Promise<void> | Promise<Asset[]>>([
      ...fontPromise,
      ...imagesPromises,
    ]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedinVar(true);
      tokenVar(token);
    }
    const persistor = new CachePersistor({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    await persistor.purge();
    //persistor.purge 를 이용하면 쿼리 변경시 필요없는 persistor 데이터를 삭제 할 수 있다.
    return preloadAsset();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {});
  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          <ThemeProvider theme={lightTheme}>
            {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
            <StatusBar style="auto" />
          </ThemeProvider>
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
