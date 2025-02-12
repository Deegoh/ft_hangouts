import { Link, router } from "expo-router";
import { StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";

const Index = () => {

  const db = useSQLiteContext();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={[styles.btn]} onPress={()=> {
        // console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'));
        console.log('sqlite version', db.getFirstSync('PRAGMA database_list;'));
      }}>
        <Text style={styles.text}>show db</Text>
      </Pressable>

      <Pressable style={[styles.btn]}>
        <Link style={styles.text} href="/contacts/1">
          contact 1
        </Link>
      </Pressable>

      <Pressable onPress={() => router.push("/add")} style={[styles.btn]}>
        <Text style={styles.text}>Add contact</Text>
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
