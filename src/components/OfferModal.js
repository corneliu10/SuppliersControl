import React from "react";
import Modal, {
  ScaleAnimation,
  ModalFooter,
  ModalButton,
  ModalContent,
  ModalTitle
} from "react-native-modals";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text, Icon, Input } from "native-base";
import { TextInput, Button, List } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

import ProductsList from "./ProductsList";
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
    marginTop: 8
  },
  productList: {
    alignItems: "center",
    justifyContent: "center"
  },
  numericInput: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12
  }
});

class OfferModal extends React.Component {
  state = {
    delay: 0
  };

  componentDidMount() {
    const { offer } = this.props;
    if (offer) {
      this.setState({ delay: offer.delay });
    }
  }

  onChangeText = value => {
    this.setState({ price: value });
  };

  onChangeETA = ETA => {
    this.setState({ ETA });
  };

  render() {
    const {
      visible,
      onChangeVisible,
      onDeleteOffer,
      onSubmitDelay,
      offer,
      statusStyle
    } = this.props;
    if (offer === null) {
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
          title={offer.company + " - " + timeConverter(offer.timestamp)}
        />
        <ModalContent style={modalStyles.content}>
          <View style={modalStyles.container}>
            <Text style={{ marginTop: -5, marginBottom: 2 }}>
              Status: <Text style={statusStyle}>{offer.status}</Text>
            </Text>
            <TextInput
              label="Price ($)"
              mode="outlined"
              disabled
              theme="dark"
              value={offer.price.toString()}
              style={modalStyles.textBox}
            />
            <TextInput
              label="Estimate Time Arrival"
              mode="outlined"
              theme="dark"
              disabled
              value={timeConverter(offer.estimate_arrival.toString())}
              style={[modalStyles.textBox, { marginBottom: 4 }]}
            />
            <ProductsList products={offer.products} />
            <List.Subheader>Add Delay (hours)</List.Subheader>
            <NumericInput
              value={this.state.delay}
              onChange={delay => this.setState({ delay })}
              minValue={0}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="red"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor="red"
              leftButtonBackgroundColor="red"
            />
          </View>
        </ModalContent>
        <ModalFooter>
          <ModalButton
            textStyle={{ color: "red" }}
            text="DELETE"
            onPress={() => onDeleteOffer(false)}
          />
          <ModalButton
            textStyle={{ color: "red" }}
            text="SUBMIT DELAY"
            onPress={() => onSubmitDelay(this.state.delay)}
          />
        </ModalFooter>
      </Modal>
    );
  }
}

export default OfferModal;
