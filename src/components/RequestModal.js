import React from "react";
import Modal, {
  ScaleAnimation,
  ModalFooter,
  ModalButton,
  ModalContent,
  ModalTitle
} from "react-native-modals";
import { Dimensions, StyleSheet } from "react-native";
import {
  View,
  Text,
  List,
  ListItem,
  Body,
  Label,
  Item,
  Input
} from "native-base";
import ProductsList from "./ProductsList";
import { TextInput } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

modalStyles = StyleSheet.create({
  container: {},
  content: {
    width: screenWidth - 40
    // height: screenHeight - 200
  },
  textBox: {
    marginTop: 8
  },
  productList: {
    alignItems: "center",
    justifyContent: "center"
  }
});

class RequestModal extends React.Component {
  state = {
    price: "1", // TODO
    ETA: "1"
  };

  onChangeText = value => {
    this.setState({ price: value });
  };

  onChangeETA = ETA => {
    this.setState({ ETA });
  };

  render() {
    const { visible, onChangeVisible, onMakeOffer, request } = this.props;
    if (request === null) {
      return null;
    }
    return (
      <Modal
        visible={visible}
        onTouchOutside={() => onChangeVisible(false)}
        modalAnimation={new ScaleAnimation({})}
        style={styles.container}
      >
        <ModalTitle title={request.data.company} />
        <ModalContent style={modalStyles.content}>
          <View style={modalStyles.container}>
            <ProductsList products={request.data.products} />
            <TextInput
              label="Price"
              mode="outlined"
              theme="dark"
              value={this.state.price}
              onChangeText={this.onChangeText}
              style={modalStyles.textBox}
            />
            <TextInput
              label="Estimate Time Arrival (hours)"
              mode="outlined"
              theme="dark"
              value={this.state.ETA}
              onChangeText={this.onChangeETA}
              style={modalStyles.textBox}
            />
          </View>
        </ModalContent>
        <ModalFooter>
          <ModalButton text="DECLINE" onPress={() => onChangeVisible(false)} />
          <ModalButton
            text="MAKE OFFER"
            onPress={() =>
              onMakeOffer(
                parseInt(this.state.price, 10),
                parseInt(this.state.ETA, 10)
              )
            }
          />
        </ModalFooter>
      </Modal>
    );
  }
}

export default RequestModal;
