import React, { Component } from "react";
import { Container, Header, Left, Body, Title, Tab, Tabs } from "native-base";
import RequestsScreen from "../screens/RequestsScreen";

export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Requests">
            <RequestsScreen />
          </Tab>
          <Tab heading="Offers">
            <RequestsScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
