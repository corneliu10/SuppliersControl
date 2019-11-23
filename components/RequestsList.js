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
    this.setState({
      requests: [...this.state.requests, { data, key }],
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

  timeConverter = UNIX_timestamp => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

  render() {
    const { requests, isLoading, visible } = this.state;
    return (
      <Container>
        <Content>
          {!isLoading ? (
            <List>
              {requests.map((req, i) => {
                return (
                  <ListItem thumbnail key={i}>
                    <Body>
                      <Text>Request {i}</Text>
                      <Text note numberOfLines={1}>
                        {this.timeConverter(req.data.timestamp)}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          this.setState({ visible: true, selectedRequest: req })
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
            <Spinner color="blue" />
          )}
          <RequestModal
            visible={visible}
            onChangeVisible={this.onChangeVisible}
            onMakeOffer={this.onMakeOffer}
            request={this.state.selectedRequest}
          />
        </Content>
      </Container>
    );
  }
}
