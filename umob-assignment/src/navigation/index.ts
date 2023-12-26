import { AuthStackParamsList } from "./auth.navigation";
import { MainStackParamsList } from "./main.navigation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamsList, AuthStackParamsList {}
  }
}
