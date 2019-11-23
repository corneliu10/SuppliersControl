import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default AppNavigator;
