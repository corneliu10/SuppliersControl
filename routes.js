import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import RequestsScreen from "./screens/RequestsScreen";
import InfoScreen from "./screens/InfoScreen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Requests: {
      screen: RequestsScreen
    },
    Info: {
      screen: InfoScreen
    }
  },
  {
    initialRouteName: "Home"
    // headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
