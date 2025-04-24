import {View, StyleSheet, Modal, TouchableOpacity} from "react-native";
import React from "react";


type ModalProps = {
  children: React.ReactNode,
  isVisible: boolean,
  onClose: (value: (((prevState: boolean) => boolean) | boolean)) => void
};

const ModalScreen = (ModalProps: ModalProps) => {
  const backHandle: () => void = () => {
    ModalProps.onClose(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModalProps.isVisible}
    >
      <TouchableOpacity
        onPress={backHandle}
        activeOpacity={1}
        style={{flex: 1}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {ModalProps.children}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    gap: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default ModalScreen;