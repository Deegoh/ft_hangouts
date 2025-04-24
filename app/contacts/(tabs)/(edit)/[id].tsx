import { router, useLocalSearchParams, Stack } from "expo-router";
import {View, Text, StyleSheet, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {Contact} from "@/types/contact";
import {Database} from "@/db/Database";
import {useSQLiteContext} from "expo-sqlite";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";
import ModalScreen from "@/components/ModalScreen";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



const Edit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    img: ""});
  const db = new Database(useSQLiteContext());
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const getContact = async () => {
    await db.getContact(id).then((data) => {
      if (data) {
        setContact(data);
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    getContact()
  }, []);

  const backHandle: () => void = () => {
    router.push("/");
  };

  const updateHandle = () => {
    db.editContact(contact).then((res) => {
      console.info("contact updated", res.lastInsertRowId, res.changes);
      router.back();
    }).catch((err) => {
      console.error(err);
    });
  }

  const removeHandle = () => {
    db.deleteContact(id).then((res) => {
      setIsModalVisible(false);
      console.info("contact removed", res.lastInsertRowId, res.changes);
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      backHandle();
    });
  }

  const modalHandle = () => {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={backHandle}>
            <Text>Back</Text>
          </Pressable>
        </View>

        <View style={styles.main}>
          <ContactForm contact={contact} setContact={setContact} />
          <View style={styles.row}>
            <Button onPress={updateHandle}>
              <FontAwesome6 name="user-pen" size={24} color="black" />
              <Text style={styles.txt}>Update</Text>
            </Button>
            <Button onPress={modalHandle}>
              <FontAwesome6 name="user-minus" size={24} color="red" />
              <Text style={[styles.txt, styles.red]}>Remove</Text>
            </Button>
          </View>
        </View>

        <ModalScreen isVisible={isModalVisible} onClose={setIsModalVisible}>
          <Text>Delete the contact ?</Text>
          <Text>This contract will be removed from your device</Text>
          <View style={styles.modalBtns}>
            <Pressable onPress={modalHandle}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable style={styles.row} onPress={removeHandle}>
              <MaterialIcons name="close" color="red" size={22}/>
              <Text style={styles.red}>Delete</Text>
            </Pressable>
          </View>
        </ModalScreen>
      </SafeAreaView>
      <Stack.Screen options={{ headerShown: false }}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    height: 40,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalBtns: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 64,
    marginTop: 32,
  },
  txt: {
    textAlign: "center",
    padding: 8,
  },
  red: {
    color: "red",
  },
});

export default Edit;