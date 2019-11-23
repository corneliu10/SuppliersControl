import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TabsExample from "../components/TabsExample";

class InfoScreen extends React.Component {
  static navigationOptions = {
    title: "Info"
    /* No more header config here! */
  };

  render() {
    const { navigation } = this.props;
    console.log("CompanyID", navigation.getParam("companyId"));
    return (
      <View style={styles.container}>
        <TabsExample />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default InfoScreen;
