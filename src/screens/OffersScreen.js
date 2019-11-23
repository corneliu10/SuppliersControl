import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import OffersList from "../components/OffersList";

class OffersScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <OffersList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default memo(OffersScreen);
