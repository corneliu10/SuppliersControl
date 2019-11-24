import { StyleSheet } from "react-native";
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
  View
} from "native-base";
import DataManager from "../firebase/DataManager";
import { timeConverter, getCompanyImage } from "../core/utils";
import OfferModal from "./OfferModal";
import { PacmanIndicator } from "react-native-indicators";

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
    _dataManager.listenOffersUpdates(this.updateOffer);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 4000);
  }

  componentWillUnmount() {
    _dataManager.removeListenRequests(this.addRequest);
  }

  addOffer = data => {
    this.setState({
      offers: [...this.state.offers, data],
      isLoading: false
    });
  };

  updateOffer = ({ offer_id, status }) => {
    let { offers } = this.state;
    const idx = offers.findIndex(offer => offer.offer_id === offer_id);
    if (idx >= 0) {
      offers[idx].status = status;
      this.setState({ offers });
    }
  };

  onChangeVisible = visible => {
    this.setState({
      visible
    });
  };

  onSubmitDelay = delay => {
    _dataManager.updateOffer({ delay }, this.state.selectedOffer.offer_id);
    this.onChangeVisible(false);
  };

  onDeleteOffer = () => {
    _dataManager.updateOffer(
      { status: "DELETED" },
      this.state.selectedOffer.offer_id
    );
    this.onChangeVisible(false);
  };

  render() {
    const { offers, isLoading, visible } = this.state;
    return (
      <Container>
        {!isLoading ? (
          <Content>
            <List>
              {offers.map((offer, i) => {
                let statusStyle = styles.waiting;
                switch (offer.status) {
                  case "WAITING":
                    statusStyle = styles.waiting;
                    break;

                  case "ACCEPTED":
                    statusStyle = styles.accepted;
                    break;

                  case "DECLINED":
                    statusStyle = styles.declined;
                    break;

                  case "DELETED":
                    return null;
                }

                return (
                  <ListItem thumbnail key={i}>
                    <Left>
                      <Thumbnail
                        square
                        source={getCompanyImage(offer.company)}
                      />
                    </Left>
                    <Body>
                      <Text style={statusStyle}>{offer.company}</Text>
                      <Text note numberOfLines={1}>
                        {timeConverter(offer.timestamp)}
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
                        <Text>View Details</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
            {this.state.selectedOffer ? (
              <OfferModal
                visible={visible}
                onChangeVisible={this.onChangeVisible}
                onDeleteOffer={this.onDeleteOffer}
                onSubmitDelay={this.onSubmitDelay}
                offer={this.state.selectedOffer}
              />
            ) : null}
          </Content>
        ) : (
          <Content contentContainerStyle={styles.content}>
            <PacmanIndicator color="#600EE6" size={100} />
          </Content>
        )}
      </Container>
    );
  }
}

styles = StyleSheet.create({
  waiting: {
    color: "orange"
  },
  accepted: {
    color: "green"
  },
  declined: {
    color: "red"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
