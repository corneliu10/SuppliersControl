import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Tab,
  Tabs,
  View,
  Right
} from "native-base";
import RequestsScreen from "../screens/RequestsScreen";
import OffersScreen from "../screens/OffersScreen";

import { Button } from "react-native-paper";
import { logoutUser } from "../api/auth-api";

export default class InfoTabs extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => logoutUser()}>Logout</Button>
          </Left>
          {/* <Right>
            <Button
              onPress={() => navigation.navigate("HistoryScreen")}
            >
              History
            </Button>
          </Right> */}
        </Header>
        <Tabs>
          <Tab heading="Requests">
            <RequestsScreen />
          </Tab>
          <Tab heading="My Offers">
            <OffersScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
