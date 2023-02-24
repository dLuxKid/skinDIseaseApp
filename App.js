// REACT NATIVE
import { useEffect, useState } from "react";
import {} from "react-native";
// EXPO
import * as AppLoading from "expo-splash-screen";
import * as Font from "expo-font";
// COMPONENTS
import Login from "./pages/Login";
// NAVIGATOR
import "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
// REDUX
import { Provider } from "react-redux";
import { store } from "./store/store";

AppLoading.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          bold: require("./assets/Font/Oswald-Bold.ttf"),
          light: require("./assets/Font/Oswald-Light.ttf"),
          medium: require("./assets/Font/Oswald-Medium.ttf"),
          regular: require("./assets/Font/Oswald-Regular.ttf"),
          semiBold: require("./assets/Font/Oswald-SemiBold.ttf"),
        });
      } catch (error) {
        console.log("Error", error);
      } finally {
        setAppReady(true);
        console.log("Loaded");
      }
    }
    loadFonts();
  }, []);

  if (!appReady) {
    return null;
  }

  if (appReady) {
    AppLoading.hideAsync();
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
