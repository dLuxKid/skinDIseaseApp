// REACT NATIVE
import { StyleSheet, Text, View } from "react-native";
import React from "react";
//COMPONENTS
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomePage from "../pages/HomePage";
import ResultsScreen from "../pages/ResultsScreen";
// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// REDUX
import { useSelector } from "react-redux";
// STYLES
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const AuthenticatonStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Homepage" component={HomePage} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.user.userToken);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainApp /> : <AuthenticatonStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
