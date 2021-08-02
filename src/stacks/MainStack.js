import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Preload from "../views/Preload/index";
import Login from "../views/Login/index";
import Register from "../views/Register/index";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        initialRouteName: "Preload",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};
