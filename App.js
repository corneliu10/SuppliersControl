import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./screens/HomeScreen";
import HomeScreen from "./screens/HomeScreen";

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
