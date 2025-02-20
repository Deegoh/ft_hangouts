import { router, useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useContact} from "@/hooks/useContact";

const ContactsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [contact] = useContact(id);

  const backHandle: () => void = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}/>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={backHandle}>
            <Text>Back</Text>
          </Pressable>
        </View>
        <View style={styles.main}>
          <Text>Hello {contact?.firstName} {id}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: 40,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
});

export default ContactsScreen;