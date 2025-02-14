import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, useColorScheme } from "react-native";
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { Database } from "@/db/Database";


const RootLayout = () => {

  const colorTheme = useColorScheme() ?? "dark";
  const db = new Database;

  return (
    <>
      <Suspense fallback={<Text>Loading...</Text>}>
        <SQLiteProvider databaseName="ft_hangouts.db" onInit={db.createTables} useSuspense={true}>
          <Stack>
            <Stack.Screen name={"index"} options={{headerShown: false}} />
            <Stack.Screen name={"contacts/add"} options={{title: "Contacts - Add contact"}} />
          </Stack>
          <StatusBar style={colorTheme} />
        </SQLiteProvider>
      </Suspense>
    </>
  );
}


export default RootLayout;
