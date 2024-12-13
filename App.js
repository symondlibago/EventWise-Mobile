import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { AuthProvider } from "./src/services/authContext";
import { ProfileProvider } from "./src/services/profileContext";
// import { Navigator } from "./src/helper/Navigator";

import Navigator from "./src/helper/Navigator";
import { PaperProvider } from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { ThemeContext } from "./src/services/ThemeContext";

export default function App() {
  const theme = useColorScheme();
  return (
    <PaperProvider>
      <AuthProvider>
        <ProfileProvider>
          <NavigationContainer
            theme={theme === "dark" ? DarkTheme : DefaultTheme}
          >
            {/* <ThemeContext> */}
            <Navigator />
            {/* </ThemeContext> */}
          </NavigationContainer>
        </ProfileProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
