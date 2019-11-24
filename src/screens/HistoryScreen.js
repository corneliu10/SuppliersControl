import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import HistoryList from "../components/HistoryList";

class HistoryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HistoryList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default memo(HistoryScreen);
