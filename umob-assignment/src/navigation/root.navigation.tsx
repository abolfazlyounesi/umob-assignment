import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./auth.navigation";
import MainNavigation from "./main.navigation";
import { useAppSelector } from "../hooks";

/**
 * @description
 * this componets handles authentication system, it renders login and register
 * screens if user is not logged in and main screens if they are
 *
 * @returns
 * auth screens or main screens based on authentication status
 */

const Stack = createNativeStackNavigator();

function RootNavigation() {
  const token = useAppSelector((state) => state.User.token);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {token ? (
        <Stack.Screen name={"Main"} component={MainNavigation} />
      ) : (
        <Stack.Screen name={"Auth"} component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigation;
