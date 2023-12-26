import React, { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

interface IScreensContainerComponent {
  noSafeArea?: boolean;
}

function ScreensContainerComponent(
  props: PropsWithChildren<IScreensContainerComponent>
) {
  const { children, noSafeArea } = props;
  if (noSafeArea) {
    return <View style={styles.root}>{children}</View>;
  }
  return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default React.memo(ScreensContainerComponent);
