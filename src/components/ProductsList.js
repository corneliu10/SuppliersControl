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
        {/* <List>
          <ListItem itemHeader>
            <Left>
              <Text style={productsStyle.header}>Products</Text>
            </Left>
            <Right>
              <Text style={productsStyle.header}>Quant</Text>
            </Right>
          </ListItem>
          {products.map((prod, i) => {
            return (
              <ListItem key={i} itemHeader>
                <Left>
                  <Text>{prod.name}</Text>
                </Left>
                <Right>
                  <Text>{prod.quantity}</Text>
                </Right>
              </ListItem>
            );
          })}
        </List>
         */}
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
    marginTop: -15
  },
  header: {
    fontWeight: "bold"
  }
});
