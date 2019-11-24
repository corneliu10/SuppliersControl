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
import RequestModal from "./RequestModal";
import { getCompanyImage, timeConverter } from "../core/utils";
import { PacmanIndicator } from "react-native-indicators";

export default class RequestsList extends Component {
  _dataManager = null;

  state = {
    requests: [],
    isLoading: true,
    visible: false,
    selectedRequest: null
  };

  async componentDidMount() {
    _dataManager = DataManager.getInstance();
    _dataManager.listenRequests(this.addRequest);
  }

  componentWillUnmount() {
    _dataManager.removeListenRequests(this.addRequest);
  }

  addRequest = ({ data, key }) => {
    const { requests } = this.state;
    requests.push({ data, key });
    requests.sort((r1, r2) => r2.data.timestamp - r1.data.timestamp);
    this.setState({
      requests,
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
    const supplier_id = _dataManager.user.uid;

    // _dataManager.updateRequestStatus("accepted", selectedRequest.key);
    const timestamp = Math.floor(Date.now() / 1000);
    _dataManager.writeOfferRequest({
      estimate_arrival: timestamp + ETA * 3600,
      price,
      request_id: selectedRequest.key,
      status: "WAITING",
      timestamp: timestamp,
      supplier_id,
      company: selectedRequest.data.company,
      products: selectedRequest.data.products,
      delay: 0
    });

    let { requests } = this.state;
    requests = requests.filter(r => r.key !== selectedRequest.key);
    this.setState({ requests });
  };

  render() {
    const { requests, isLoading, visible } = this.state;
    return (
      <Container>
        {!isLoading ? (
          <Content>
            <List>
              {requests.map((req, i) => {
                return (
                  <ListItem thumbnail key={i}>
                    <Left>
                      <Thumbnail
                        square
                        source={getCompanyImage(req.data.company)}
                      />
                    </Left>
                    <Body>
                      <Text>{req.data.company}</Text>
                      <Text note numberOfLines={1}>
                        {timeConverter(req.data.timestamp)}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          this.setState({ visible: true, selectedRequest: req })
                        }
                      >
                        <Text>View Details</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
            <RequestModal
              visible={visible}
              onChangeVisible={this.onChangeVisible}
              onMakeOffer={this.onMakeOffer}
              request={this.state.selectedRequest}
            />
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
