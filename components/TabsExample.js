import React, { Component } from "react";
import { Container, Header, Left, Body, Title, Tab, Tabs } from "native-base";
import RequestsScreen from "../screens/RequestsScreen";

export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Tab1">
            <RequestsScreen />
          </Tab>
          <Tab heading="Tab2">
            <RequestsScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
