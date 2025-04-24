import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import { useState } from "react";
import {Pressable, Text, StyleSheet, View} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Database } from "@/db/Database";
import { Contact } from "@/types/contact"
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const add = () => {
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    img: ""});

  const router = useRouter();
  const db = new Database(useSQLiteContext());

  const addContactHandle = async () => {
    db.addContact(contact).then((res) => {
      console.info("contact added", res.lastInsertRowId, res.changes);
      router.push("/");
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      <Header onBack={()=>router.back()} title="Create contact">
        <Pressable onPress={()=>{router.push("/")}}>
          <MaterialIcons name="menu" size={24} color="black" />
        </Pressable>
      </Header>

      <View style={styles.main}>
        <ContactForm contact={contact} setContact={setContact} />
        <Pressable onPress={addContactHandle} style={styles.btn}>
          <Text style={styles.txt}>Add contact</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  main:{
    flex: 1,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  btn: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#CCC",
  },
  txt: {
    textAlign: "center",
    padding: 8,
  },
});

export default add;
