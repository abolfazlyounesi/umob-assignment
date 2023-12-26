import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiService } from "../../api";

/**
 * @description
 * redux module to handle game data and game api calls
 */

export const getGame = createAsyncThunk("game/getGame", async () => {
  try {
    const res = await ApiService.getGameData();

    return res;
  } catch (error: any) {
    Alert.alert("Error", error?.message);
    console.log("game error", error);
  }
});

const initialState = {
  thirdProvider: {
    city: "",
    reserved_bikes_num: 0,
    station_name: {
      station_id: "",
      name: "",
      lat: 0,
      lon: 0,
      region_id: "",
      is_virtual_station: false,
      capacity: 8,
      vehicle_capacity: {
        bike: 8,
      },
      rental_uris: {
        android: "",
        ios: "",
      },
      address: "",
      post_code: "",
    },
    station_in_this_city: [] as {
      name: string;
      lat: number;
      lon: number;
      is_correct?: boolean;
    }[],
    station_capasity: {
      name: "",
      lat: 0,
      lon: 0,
      capacity: 8,
    },
  },
  secondProvider: {
    enable_station: [] as {
      name: string;
      lat: number;
      lon: number;
      is_correct?: boolean;
    }[],
    number_of_bikes: {
      name: "",
      lat: 0,
      lon: 0,
      num_bikes_available: 0,
    },
  },
  firstProvider: {
    with_most_docs: [] as {
      name: string;
      is_correct?: boolean;
    }[],
    with_most_bikes: [] as {
      name: string;
      is_correct?: boolean;
    }[],
    leest_bike_available: [] as {
      name: string;
      is_correct?: boolean;
    }[],
  },
  isLoading: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getGame.pending, (state) => {
      state.isLoading = true;
      return state;
    });
    builder.addCase(getGame.rejected, (state) => {
      state = initialState;
      return state;
    });
    builder.addCase(getGame.fulfilled, (state, action) => {
      state = action.payload;
      state.isLoading = false;
      return state;
    });
  },
});

export const { reducer: GameReducer, actions: GameActions } = gameSlice;

export default GameReducer;
