import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
export default class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem avatar>
              <Body>
                <Text>Kumar Pratik</Text>
              </Body>
              <Right>
                <Text note></Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
