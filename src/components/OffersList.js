import React, { Component } from "react";
import { StyleSheet } from "react-native";
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

export default class OffersList extends Component {
  _dataManager = null;

  state = {
    offers: [],
    isLoading: true,
    visible: false,
    selectedOffer: null
  };

  async componentDidMount() {
    _dataManager = DataManager.getInstance();
    _dataManager.listenOffers(this.addOffer);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 4000);
  }

  componentWillUnmount() {
    _dataManager.removeListenRequests(this.addRequest);
  }

  addOffer = ({
    estimate_arrival,
    offer_id,
    price,
    request_id,
    status,
    timestamp
  }) => {
    this.setState({
      offers: [...this.state.offers, { price, status, timestamp }],
      isLoading: false
    });
  };

  onChangeVisible = visible => {
    this.setState({
      visible
    });
  };

  onMakeOffer = (price, ETA) => {
    this.setState({
      visible: false
    });

    const { selectedRequest } = this.state;
    console.log(selectedRequest);
    _dataManager.writeOfferRequest({
      estimate_arrival: ETA,
      price,
      request_id: selectedRequest.key,
      status: "in_progress",
      timestamp: new Date().getTime()
    });
  };

  render() {
    const { offers, isLoading, visible } = this.state;
    return (
      <Container>
        <Content>
          {!isLoading ? (
            <List>
              {offers.map((offer, i) => {
                const statusStyle =
                  offer.status === "in_progress"
                    ? styles.inProgress
                    : styles.accepted;

                return (
                  <ListItem thumbnail key={i}>
                    <Body>
                      <Text style={statusStyle}>Offer {i}</Text>
                      <Text note numberOfLines={1}>
                        {"asd"}
                        {/* {this.timeConverter(req.data.timestamp)} */}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          this.setState({
                            visible: true,
                            selectedOffer: offer
                          })
                        }
                      >
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Spinner color="orange" />
          )}
          {/* <RequestModal
            visible={visible}
            onChangeVisible={this.onChangeVisible}
            onMakeOffer={this.onMakeOffer}
            request={this.state.selectedRequest}
          /> */}
        </Content>
      </Container>
    );
  }
}

styles = StyleSheet.create({
  inProgress: {
    color: "orange"
  },
  accepted: {
    color: "green"
  }
});
