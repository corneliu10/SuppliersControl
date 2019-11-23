import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Tab,
  Tabs,
  View
} from "native-base";
import RequestsScreen from "../screens/RequestsScreen";
import OffersScreen from "../screens/OffersScreen";

import { Button } from "react-native-paper";
import { logoutUser } from "../api/auth-api";

export default class InfoTabs extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => logoutUser()}>Logout</Button>
          </Left>
        </Header>
        <Tabs>
          <Tab heading="Requests">
            <RequestsScreen />
          </Tab>
          <Tab heading="Offers">
            <OffersScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
