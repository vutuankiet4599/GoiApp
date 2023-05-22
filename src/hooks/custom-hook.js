import { useCallback, useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import { useNavigation } from "@react-navigation/native";

export const useCheckLoggedIn = () => {
  let { data } = useContext(AppContext);
  const navigation = useNavigation();

  let checkLoggedIn = useCallback(() => {
    if (data.userInfo === {}) {
      navigation.navigate("Login");
    }
  }, [data]);

  return checkLoggedIn;
};
