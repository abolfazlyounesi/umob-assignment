import React, { useState } from "react";
import { ScreensContainerComponent } from "../../common";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../redux/slices";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.User.loading);

  function onPressRegister() {
    dispatch(login({ email, password }));
  }

  return (
    <ScreensContainerComponent noSafeArea>
      <ImageBackground
        source={require("../../../assets/login.png")}
        style={styles.container}
      >
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          left={<TextInput.Icon icon={"email"} />}
          mode={"outlined"}
          keyboardType={"email-address"}
          testID={"EMAIL"}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          left={<TextInput.Icon icon={"lock"} />}
          mode={"outlined"}
          secureTextEntry
          testID={"PASSWORD"}
        />
        <Button
          icon="login"
          mode="contained"
          onPress={onPressRegister}
          style={styles.button}
          loading={loading}
          testID={"LOGIN_BUTTON"}
        >
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigate("RegisterScreen")}
          style={styles.registerButton}
          // loading
        >
          <Text style={styles.registerButtonText}>
            don't have account? Register
          </Text>
        </Button>
      </ImageBackground>
    </ScreensContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  button: {
    borderRadius: 4,
    marginTop: "15%",
  },
  registerButton: {
    position: "absolute",
    bottom: "3%",
    alignSelf: "center",
  },
  registerButtonText: {
    color: "white",
  },
});
