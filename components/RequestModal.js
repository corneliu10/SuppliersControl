import React from "react";
import Modal, { ModalContent } from "react-native-modals";
import { Button } from "react-native";

export default class RequestModal extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Show Modal"
          onPress={() => {
            this.setState({ visible: true });
          }}
        />
        <Modal
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <ModalContent></ModalContent>
        </Modal>
      </View>
    );
  }
}
