import React, { useState, useEffect } from "react";
import {Contact} from "@/types/contact";
import {useSQLiteContext} from "expo-sqlite";
import {Database} from "@/db/Database";

export const useContacts = (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const db = new Database(useSQLiteContext());


  const getContactsList = async () => {
    await db.getList("contacts").then((contacts) => {
      const emptyContact = {} as Contact
      setContacts(contacts);
      setContacts((prev) => [...prev, emptyContact]);
      console.log(contacts)
      setIsLoading(false);
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    getContactsList();
  }, []);

  return {contacts};
};
