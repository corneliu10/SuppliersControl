import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RequestsList from "../components/RequestsList";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RequestsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
