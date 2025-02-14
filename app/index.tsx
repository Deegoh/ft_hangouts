import { Link, router } from "expo-router";
import { StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Database } from "@/db/Database"
import {useSQLiteContext} from "expo-sqlite";

const Index = () => {

  const db = new Database(useSQLiteContext());
  const dbc = useSQLiteContext();
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={[styles.btn]} onPress={async ()=> {
          console.info(await dbc.getAllAsync(`SELECT * FROM sqlite_master where type='table'`))
        }}>
        <Text style={styles.text}>show db</Text>
      </Pressable>

      <Pressable style={[styles.btn]} onPress={()=> {
        db.getList("contacts").then((rows) => {
          console.info(rows)}
        ).catch((err) => {
          console.error(err)}
        );
      }}>
        <Text style={styles.text}>Get Contacts</Text>
      </Pressable>

      <Pressable style={[styles.btn]}>
        <Link style={styles.text} href="/contacts/1">
          contact 1
        </Link>
      </Pressable>

      <Pressable onPress={() => router.push("/contacts/add")} style={[styles.btn]}>
        <Text style={styles.text}>Add contact</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#050505",
    flexDirection: "column",
    flex: 1,
    gap: 8,
  },
  btn: {
    flex: 1,
  },
  text: {
    paddingTop: "30%",
    flex: 1,
    backgroundColor: "#CCC",
    borderRadius: 50,
    textAlign: "center",
  },
});

export default Index;
