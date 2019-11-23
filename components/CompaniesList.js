import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Metro",
    image: require("../assets/company.png")
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Emag",
    image: require("../assets/emag.png")
  }
];

export default class CompaniesList extends Component {
  render() {
    const { handleShowRequests } = this.props;

    return (
      <Container>
        <Content>
          <List>
            {DATA.map((item, i) => {
              return (
                <ListItem thumbnail key={i}>
                  <Left>
                    <Thumbnail square source={item.image} />
                  </Left>
                  <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>
                      Its time to build a difference . .
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => handleShowRequests(item.id)}
                    >
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
