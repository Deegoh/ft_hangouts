import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, Text, StyleSheet, View } from "react-native";
import { Database } from "@/db/Database";
import { Contact } from "@/types/contact"

const add = () => {
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    img: ""});

  const router = useRouter();
  const db = new Database();

  const handleFirstNameChange = (value: any) => {
    setContact({...contact, firstName: value});
  }
  const handleLastNameChange = (value: any) => {
    setContact({...contact, lastName: value});
  }
  const handleEmailChange = (value: any) => {
    setContact({...contact, email: value});
  }
  const handlePhoneChange = (value: any) => {
    setContact({...contact, phone: value});
  }
  const handleImgChange = (value: any) => {
    setContact({...contact, img: value});
  }

  const addContactHandle = () => {
    console.log(contact);

    db.addContact(contact).then(
      () => {
        console.log("contact added");
      });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="firstName"
        value={contact.firstName}
        onChangeText={handleFirstNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="lastName"
        value={contact.lastName}
        onChangeText={handleLastNameChange} />

      <TextInput
        style={styles.input}
        placeholder="phone"
        value={contact.phone}
        onChangeText={handlePhoneChange} />

      <TextInput
        style={styles.input}
        placeholder="email"
        value={contact.email}
        onChangeText={handleEmailChange} />


      <TextInput
        style={styles.input}
        placeholder="img"
        value={contact.img}
        onChangeText={handleImgChange}
      />
      <Pressable onPress={addContactHandle} style={styles.btn}>
        <Text style={styles.txt}>Add contact</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "space-around",
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
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
