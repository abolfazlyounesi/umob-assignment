import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen, QuestionsScreen } from "../screens";
import { LatLng } from "react-native-maps";

/**
 * @description
 * this component handles main screens' routing and their params typing
 */

export type MainStackParamsList = {
  QuestionsScreen: undefined;
  MapScreen: { locations: LatLng[] };
};

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"QuestionsScreen"} component={QuestionsScreen} />
      <Stack.Screen name={"MapScreen"} component={MapScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigation;
