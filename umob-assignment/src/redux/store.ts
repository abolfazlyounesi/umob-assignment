import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig } from "redux-persist/es/types";
import { RootReducer, RootState } from "./root-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  whitelist: ["User"],
  blacklist: ["Game"],
};
const persistedRootReducer = persistReducer(persistConfig, RootReducer);

export const appStore = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }),
});

export const appStorePersistor = persistStore(appStore);

export type AppDispatch = typeof appStore.dispatch;

/**
 *
 * @returns a mock of app store for automated tests
 */

export const getRootStateMock = (): RootState => ({
  Game: {
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
  },
  User: { token: "", email: "", name: "", id: 0, loading: false },
});
