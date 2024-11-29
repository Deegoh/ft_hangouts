import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from 'react-native';


export const RootLayout = () => {

  if (Platform.OS === 'web') {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </>
    );
  }

  const SQLite = require('expo-sqlite');

  return (
    <SQLite.SQLiteProvider databaseName="ft_hangouts.db">
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </SQLite.SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: any) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY NOT NULL,
        firstName TEXT NOT NULL,
        name TEXT,
        phone TEXT NOT NULL,
        imageURI TEXT
        );
  `);
}

export default RootLayout;
