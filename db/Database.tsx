import {SQLiteDatabase, useSQLiteContext} from "expo-sqlite";
import { Contact } from "@/types/contact"

export class Database {
  db: SQLiteDatabase;
  tables = [
    "contacts",
    "messages"
  ]

  constructor() {
    this.db = useSQLiteContext()
  }

  async createTables() {
    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;
  
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL UNIQUE,
        img TEXT NOT NULL UNIQUE
      );
      
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contactId INTEGER NOT NULL,
        speakerId INTEGER NOT NULL,
        date INTEGER NOT NULL,
        message TEXT NOT NULL,
        FOREIGN KEY (contactId)
          REFERENCES contacts (id),
        FOREIGN KEY (speakerId)
          REFERENCES contacts (id)
      );
    `);
    console.log("createTables");
  }

  async getList(table: string) {
    if (!this.tables.includes(table)) {
      throw new Error("Invalid table");
    }

    const allRows = await this.db.getAllAsync("SELECT * FROM ?", [table]);
    console.log(allRows);
    return allRows;
  }

  async addContact(contact: Contact) {
    if (contact.firstName === "" || contact.phone === "") {
      throw new Error("Invalid contact");
    }

    const result = await this.db.runAsync('INSERT INTO contacts (firstName, lastName, email, phone, img) VALUES (?, ?, ?, ?, ?)',
      contact.firstName, contact.lastName, contact.email, contact.phone, contact.img);
    console.log(result.lastInsertRowId, result.changes);
    return result;
  }
}