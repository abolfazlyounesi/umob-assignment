import React, { useState } from "react";
import { ScreensContainerComponent } from "../../common";
import { ImageBackground, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { register } from "../../redux/slices";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.User.loading);

  function onPressRegister() {
    dispatch(register({ name, email, password }));
  }

  return (
    <ScreensContainerComponent noSafeArea>
      <ImageBackground
        source={require("../../../assets/register.png")}
        style={styles.container}
      >
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          left={<TextInput.Icon icon={"account-details"} />}
          mode={"outlined"}
          keyboardType={"name-phone-pad"}
          activeOutlineColor={"black"}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          left={<TextInput.Icon icon={"email"} />}
          mode={"outlined"}
          keyboardType={"email-address"}
          activeOutlineColor={"black"}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          left={<TextInput.Icon icon={"lock"} />}
          mode={"outlined"}
          secureTextEntry
          activeOutlineColor={"black"}
        />
        <Button
          icon="account-arrow-right"
          mode="contained"
          onPress={onPressRegister}
          style={styles.registerButton}
          // loading
        >
          Register
        </Button>

        <Button
          mode="text"
          onPress={() => navigate("LoginScreen")}
          style={styles.loginButton}
          loading={loading}
        >
          <Text style={styles.loginButtonText}>have account? Login</Text>
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
  registerButton: {
    borderRadius: 4,
    marginTop: "15%",
  },
  loginButton: {
    position: "absolute",
    bottom: "3%",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
  },
});
