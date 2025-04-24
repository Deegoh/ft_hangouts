import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";


const ContactsLayout = () => {

  const colorTheme = useColorScheme() ?? "dark";

  return (
    <>
      <Stack>
        <Stack.Screen name={"(tabs)"} options={{ headerShown: false}} />
        <Stack.Screen name={"add"} options={{ headerShown: false}} />
      </Stack>
      <StatusBar style={colorTheme} />
    </>
  );
}


export default ContactsLayout;
