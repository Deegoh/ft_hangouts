import {Contact} from "@/types/contact";
import {StyleSheet, TextInput, View, Text} from "react-native";

interface ContactFormProps {
  contact: Contact,
  setContact: (value: (((prevState: Contact) => Contact) | Contact)) => void
}

const ContactForm = ({contact, setContact}: ContactFormProps) => {

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

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="firstName"
        defaultValue={contact.firstName}
        value={contact.firstName}
        onChangeText={handleFirstNameChange}
      />

      <TextInput
        style={styles.input}
        placeholder="lastName"
        defaultValue={contact.lastName}
        value={contact.lastName}
        onChangeText={handleLastNameChange}/>

      <TextInput
        style={styles.input}
        placeholder="phone"
        keyboardType={"phone-pad"}
        value={contact.phone}
        onChangeText={handlePhoneChange}/>

      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType={"email-address"}
        value={contact.email}
        onChangeText={handleEmailChange}/>

      <TextInput
        style={styles.input}
        placeholder="img"
        value={contact.img}
        onChangeText={handleImgChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 8,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
  },
});

export default ContactForm;