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
const Tab = createBottomTabNavigator();

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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle:{
          paddingBottom: 5
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homepage") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Results") {
            iconName = focused ? "ios-list" : "ios-list-circle";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Homepage" component={HomePage} />
      <Tab.Screen name="Results" component={ResultsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.user.userToken);

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthenticatonStack />}
    </NavigationContainer>          
  );
};

export default AppNavigator;
