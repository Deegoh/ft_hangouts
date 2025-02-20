import { useState, useEffect } from 'react';
import {Contact} from "@/types/contact";
import {useSQLiteContext} from "expo-sqlite";
import {Database} from "@/db/Database";

export const useContact = (id: string) => {
  const [contact, setContact] = useState<Contact>();
  const db = new Database(useSQLiteContext());

  const getContact = async () => {
    db.getContact(id).then((data) => {
      if (data) {
        setContact(data);
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    getContact();
  }, []);

  return [contact];
};