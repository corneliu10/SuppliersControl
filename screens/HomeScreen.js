import React from "react";
import { View, Text } from "react-native";
import RequestsList from "../components/RequestsList";
import DataManager from "../Firebase/DataManager";

class HomeScreen extends React.Component {
  async componentDidMount() {
    // _dataManager = DataManager.getInstance();
    // await _dataManager.readSuppliersRequest();
    // _dataManager.writeOfferRequest({ test: "a" });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <RequestsLists /> */}
      </View>
    );
  }
}

export default HomeScreen;
