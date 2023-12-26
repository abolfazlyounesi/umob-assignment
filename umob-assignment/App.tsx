import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigation from "./src/navigation/root.navigation";
import { appStore, appStorePersistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      staleTime: 1 * (60 * 1000),
      // cacheTime: 10 * (60 * 1000),
      refetchOnWindowFocus: "always",
    },
  },
});

export default function App() {
  console.log(appStore?.getState());

  return (
    <Provider store={appStore}>
      <PersistGate persistor={appStorePersistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
