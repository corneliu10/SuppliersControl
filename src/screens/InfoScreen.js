import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoTabs from "../components/InfoTabs";

class InfoScreen extends React.Component {
  static navigationOptions = {
    title: "Info"
    /* No more header config here! */
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <InfoTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default memo(InfoScreen);
