import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CompaniesList from "../components/CompaniesList";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
    /* No more header config here! */
  };

  onHandleShowRequests = companyId => {
    this.props.navigation.navigate("Info", { companyId });
  };

  render() {
    return (
      <View style={styles.container}>
        <CompaniesList handleShowRequests={this.onHandleShowRequests} />
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
