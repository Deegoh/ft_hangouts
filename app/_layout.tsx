import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, useColorScheme } from "react-native";
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';


const RootLayout = () => {

  const colorTheme = useColorScheme() ?? "dark";

  return (
    <>
      <Suspense fallback={<Text>Loading...</Text>}>
        <SQLiteProvider databaseName="ft_hangouts.db" useSuspense={true}>
          <Stack>
            <Stack.Screen name={"index"} options={{headerShown: false}} />
            <Stack.Screen name={"add"} options={{title: "Contacts - Add contact"}} />
          </Stack>
          <StatusBar style={colorTheme} />
        </SQLiteProvider>
      </Suspense>
    </>
  );
}


export default RootLayout;
