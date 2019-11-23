import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Spinner
} from "native-base";

import DataManager from "../firebase/DataManager";

export default class RequestsList extends Component {
  _dataManager = null;

  state = {
    requests: [],
    isLoading: true
  };

  async componentDidMount() {
    _dataManager = DataManager.getInstance();
    _dataManager.listenRequests(this.addRequest);
  }

  componentWillUnmount() {
    _dataManager.removeListenRequests(this.addRequest);
  }

  addRequest = ({ data, key }) => {
    this.setState({
      requests: [...this.state.requests, { data, key }],
      isLoading: false
    });
  };

  render() {
    const { requests, isLoading } = this.state;
    console.log(requests, isLoading);
    return (
      <Container>
        <Content>
          {!isLoading ? (
            <List>
              {requests.map((req, i) => {
                return (
                  <ListItem thumbnail key={i}>
                    <Left>
                      <Thumbnail square />
                    </Left>
                    <Body>
                      <Text>{req.data}</Text>
                      <Text note numberOfLines={1}>
                        Its time to build a difference . .
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Spinner color="blue" />
          )}
        </Content>
      </Container>
    );
  }
}
