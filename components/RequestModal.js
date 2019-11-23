import React from "react";
import Modal, {
  ScaleAnimation,
  ModalFooter,
  ModalButton,
  ModalContent,
  ModalTitle
} from "react-native-modals";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text, Item, Input } from "native-base";
import DatePicker from "react-native-datepicker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class RequestModal extends React.Component {
  state = {
    price: null,
    ETA: null
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
        <ModalTitle title={"asd"} />
        <ModalContent style={styles.content}>
          <View style={styles.container}>
            <Text>{request.data.timestamp}</Text>
            <Item regular style={styles.textBox}>
              <Input
                placeholder="Estimate Arrival Time (hours)"
                value={this.state.ETA}
                onChangeText={this.onChangeETA}
              />
            </Item>
            <Item regular style={styles.textBox}>
              <Input
                placeholder="Price"
                value={this.state.price}
                onChangeText={this.onChangeText}
              />
            </Item>
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

styles = StyleSheet.create({
  container: {},
  content: {
    width: screenWidth - 80
    // height: screenHeight - 200
  },
  textBox: {
    marginTop: 8
  }
});
