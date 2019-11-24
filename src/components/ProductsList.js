import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Left,
  Body,
  Right,
  View,
  Text
} from "native-base";
import { List } from "react-native-paper";

export default class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return (
      <View style={productsStyle.container}>
        <List.Section>
          <List.Subheader>Products / Quantity</List.Subheader>
          {products.map((prod, i) => {
            return (
              <List.Item
                key={i}
                title={prod.name}
                description={prod.quantity}
                left={props => <List.Icon {...props} icon="gift" />}
              />
            );
          })}
        </List.Section>
      </View>
    );
  }
}

productsStyle = StyleSheet.create({
  container: {
    marginTop: 0
  },
  header: {
    fontWeight: "bold"
  }
});
