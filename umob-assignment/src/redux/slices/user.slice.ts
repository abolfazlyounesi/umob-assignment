import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiService } from "../../api";
import { Alert } from "react-native";

/**
 * @description
 * redux module to handle user data, login and register api calls
 */

export const register = createAsyncThunk(
  "user/register",
  async (data: { email: string; password: string; name: string }) => {
    try {
      const res = await ApiService.register({
        name: data.name,
        password: data.password,
        email: data.email,
        username: data.email,
      });
      console.log("rgitster res", res);

      return res;
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.error?.message);
      console.log("rgitster error", error?.response);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }) => {
    try {
      const res = await ApiService.login({
        password: data.password,
        identifier: data.email,
      });
      console.log("login res", res);

      return res;
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.error?.message);
      console.log("login error", error?.response);
    }
  }
);

// export const refreshToken = createAsyncThunk(
//   "user/refreshToken",
//   async (_, { getState }) => {
//     const State = getState as any;
//     try {
//       const res = await ApiService.refreshToken({
//         token: State()?.User?.token,
//       });
//       console.log("refresh token", res);

//       return res?.token;
//     } catch (error) {
//       console.log("refresh token error", error);
//     }
//   }
// );

const initialState = {
  token: "",
  email: "",
  name: "",
  id: 0,
  loading: false,
  results: [] as number[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; email: string; id: number }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.id = action.payload.id;
      return state;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      return state;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
    updateResult: (state, action) => {
      state.results = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload?.jwt;
      state.email = action.payload?.user?.email;
      state.name = action?.payload?.user?.name;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.token = "";
      state.loading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload?.jwt;
      state.email = action.payload?.user?.email;
      state.name = action?.payload?.user?.name;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.token = "";
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { reducer: UsersReducer, actions: UserActions } = userSlice;

export default UsersReducer;
