import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreensContainerComponent } from "../../common";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

export default function MapScreen() {
  const { goBack } = useNavigation();
  const { params } = useRoute<any>();

  return (
    <ScreensContainerComponent>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>
      <MapView style={styles.map} initialRegion={params?.locations?.[0]}>
        {params?.locations?.map((i: LatLng, index: number) => (
          <Marker coordinate={i} key={index} />
        ))}
      </MapView>
    </ScreensContainerComponent>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
