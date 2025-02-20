import { router } from "expo-router";
import {StyleSheet, Pressable, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Database } from "@/db/Database"
import {useSQLiteContext} from "expo-sqlite";
import {useState} from "react";
import FlatListItems from "@/components/FlatListItems";
import {FlashList} from "@shopify/flash-list";
import {useContacts} from "@/hooks/useContacts";

const Index = () => {
  const db = new Database(useSQLiteContext());
  const [isLoading, setIsLoading] = useState(true);
  const {contacts} = useContacts(setIsLoading);
  const [isDevMode, setIsDevMode] = useState(false)

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.view}>
      {isLoading ? (<Text>Loading...</Text>) : (
        <FlashList data={contacts} estimatedItemSize={200} renderItem={FlatListItems}/>
      )}
      <Pressable style={[styles.add, {left: 20}]} onPress={() => setIsDevMode(!isDevMode)} >
        <Text style={styles.plus}>?</Text>
      </Pressable>
      <Pressable style={styles.add} onPress={() => router.push("/contacts/add")} >
        <Text style={styles.plus}>+</Text>
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
    paddingHorizontal: 8,
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
    // borderRadius: 50,
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
  plus: {
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Index;
