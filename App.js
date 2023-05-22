import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/Home.js";
import Login from "./src/components/Login.js";
import { IconComponentProvider, Provider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Register } from "./src/components/Register.js";
import { AppProvider } from "./src/providers/AppProvider.js";
import { New } from "./src/components/New.js";
import { Toast } from "react-native-toast-message/lib/src/Toast.js";
// require("dotenv").config();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <Provider>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="New" component={New} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </IconComponentProvider>
      </Provider>
    </AppProvider>
  );
}
