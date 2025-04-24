import { router } from "expo-router";
import {StyleSheet, Pressable, Text, View, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Database } from "@/db/Database"
import {useSQLiteContext} from "expo-sqlite";
import {useState} from "react";
import FlatListItems from "@/components/FlatListItems";
import {FlashList} from "@shopify/flash-list";
import {useContacts} from "@/hooks/useContacts";
import Header from "@/components/Header";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Index = () => {
  const db = new Database(useSQLiteContext());
  const [isLoading, setIsLoading] = useState(true);
  const {contacts} = useContacts(setIsLoading);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDevMode, setIsDevMode] = useState(false)

  const contactsFiltered = contacts.filter(contact =>
    String(contact.firstName).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <SafeAreaView style={styles.container}>

    <Header title="Contacts">
      <Pressable onPress={()=>{router.push("/")}}>
        <MaterialIcons name="menu" size={24} color="black" />
      </Pressable>
    </Header>

    <TextInput
      style={styles.input}
      placeholder="Search"
      value={searchTerm}
      onChangeText={setSearchTerm}/>

    <View style={styles.view}>
      {isLoading ? (<Text>Loading...</Text>) : (
        <FlashList data={contactsFiltered} estimatedItemSize={200} renderItem={FlatListItems}/>
      )}
      <Pressable style={[styles.add, {left: 20}]} onPress={() => setIsDevMode(!isDevMode)} >
        <Text style={styles.plus}>?</Text>
      </Pressable>
      <Pressable style={styles.add} onPress={() => router.push("/contacts/add")} >
        <Text style={styles.plus}><FontAwesome6 name="user-plus" size={24} color="white" /></Text>
      </Pressable>
    </View>

    {isDevMode && (
      <View style={styles.view}>
        <Pressable style={[styles.btn]} onPress={async ()=> {
          console.info(db.getTables())
        }}>
          <Text style={styles.text}>show db</Text>
        </Pressable>

        <Pressable style={[styles.btn]} onPress={()=> {
          console.log(contacts)
        }}>
          <Text style={styles.text}>Get Contacts</Text>
        </Pressable>

        <Pressable style={[styles.btn]} onPress={()=> {
          db.resetDB().then(()=> {
            console.info("db reset")}
          ).catch((err) => {
            console.error(err)
          });
        }}>
          <Text style={styles.text}>reset db</Text>
        </Pressable>
      </View>
    )}
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  view: {
    flex: 1,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    width: "100%",
  },
  text: {
    textAlign: "center",
    padding: 20,
    backgroundColor: "#CCC",
  },
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  plus: {
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Index;
