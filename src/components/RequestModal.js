import React from "react";
import Modal, {
  ScaleAnimation,
  ModalFooter,
  ModalButton,
  ModalContent,
  ModalTitle
} from "react-native-modals";
import { Dimensions, StyleSheet, KeyboardAvoidingView } from "react-native";
import { View } from "native-base";
import ProductsList from "./ProductsList";
import { TextInput } from "react-native-paper";
import { timeConverter } from "../core/utils";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

modalStyles = StyleSheet.create({
  container: {},
  content: {
    width: screenWidth - 40
    // height: screenHeight - 200
  },
  textBox: {
    marginTop: 8,
    marginBottom: 8
  },
  productList: {
    alignItems: "center",
    justifyContent: "center"
  }
});

class RequestModal extends React.Component {
  state = {
    price: null, // TODO
    ETA: null,
    isPriceError: false,
    isETAError: false
  };

  onChangeText = value => {
    const isNum = value === "" ? true : /^\d+$/.test(value);
    this.setState({ price: value, isPriceError: !isNum });
  };

  onChangeETA = ETA => {
    const isNum = ETA === "" ? true : /^\d+$/.test(ETA);
    this.setState({ ETA, isETAError: !isNum });
  };

  clear = () => {
    this.setState({
      price: null, // TODO
      ETA: null,
      isPriceError: false,
      isETAError: false
    });
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
        <ModalTitle
          title={
            request.data.company + " - " + timeConverter(request.data.timestamp)
          }
        />
        <ModalContent style={modalStyles.content}>
          <View style={modalStyles.container}>
            <TextInput
              label="Price ($)"
              mode="outlined"
              theme="dark"
              error={this.state.isPriceError}
              value={this.state.price}
              onChangeText={this.onChangeText}
              style={{ marginTop: 4 }}
            />
            <TextInput
              label="Estimate Time Arrival (hours)"
              mode="outlined"
              theme="dark"
              error={this.state.isETAError}
              value={this.state.ETA}
              onChangeText={this.onChangeETA}
              style={modalStyles.textBox}
            />
            <ProductsList products={request.data.products} />
          </View>
        </ModalContent>
        <ModalFooter>
          <ModalButton text="CANCEL" onPress={() => onChangeVisible(false)} />
          <ModalButton
            text="MAKE OFFER"
            onPress={() => {
              if (
                !this.state.isPriceError &&
                !this.state.isETAError &&
                this.state.price !== "" &&
                this.state.ETA !== "" &&
                this.state.price !== null &&
                this.state.ETA !== null
              ) {
                onMakeOffer(
                  parseInt(this.state.price, 10),
                  parseInt(this.state.ETA, 10)
                );
              }
            }}
          />
        </ModalFooter>
      </Modal>
    );
  }
}

export default RequestModal;
