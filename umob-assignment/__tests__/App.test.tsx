import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { getRootStateMock } from "../src/redux/store";
import { LoginScreen, QuestionsScreen } from "../src/screens";
import configureMockStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";
import * as gameReducer from "../src/redux/slices/game.slice";
import * as UsersReducer from "../src/redux/slices/user.slice";
import { thunk } from "redux-thunk";

jest.useFakeTimers();

const middlewares = [thunk];

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

const mockStore = configureMockStore(middlewares);
const store = mockStore(getRootStateMock());

const setupQuestionScreen = () => {
  const wrapper = render(
    <ReduxProvider store={store}>
      <QuestionsScreen />
    </ReduxProvider>
  );
  return {
    wrapper,
  };
};

const setupLoginScreen = () => {
  const wrapper = render(
    <ReduxProvider store={store}>
      <LoginScreen />
    </ReduxProvider>
  );
  return {
    wrapper,
  };
};

describe("QuestionScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test the api call at screen load", async () => {
    const Spy = jest.spyOn(gameReducer, "getGame");

    setupQuestionScreen();

    expect(Spy).toHaveBeenCalledTimes(1);
  });
});

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test the login screen to have all elements rendered", async () => {
    const { wrapper } = setupLoginScreen();

    const loginButton = wrapper.getAllByTestId("LOGIN_BUTTON");
    const emailField = wrapper.getAllByTestId("EMAIL");
    const passwordField = wrapper.getAllByTestId("PASSWORD");

    expect(loginButton).toBeTruthy();
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });
});
