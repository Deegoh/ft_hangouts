import {type SQLiteDatabase} from 'expo-sqlite';
import {Contact} from "@/types/contact"

export class Database {
  db: SQLiteDatabase | undefined;
  tables = [
    "contacts",
    "messages"
  ]

  constructor(db?: SQLiteDatabase) {
    if (!this.db) {
      this.db = db;
    }
  }

  async createTables(db: SQLiteDatabase | undefined = undefined) {
    if (!this.db) {
      this.db = db;
    }
    if (!this.db) {
      throw new Error("Set DB first");
    }
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await (this.db.getFirstAsync<{ user_version: number }>('PRAGMA user_version') as Promise<{ user_version: number }>);
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await this.db.execAsync(`PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT,
          email TEXT,
          phone TEXT NOT NULL,
          img TEXT
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
      console.info("createTables");
    }
    await this.db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }

  async getTables() {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    await this.db.getAllAsync(`SELECT * FROM sqlite_master where type='table'`)
  }

  async resetDB() {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    await this.db.execAsync(`
    PRAGMA user_version = 0;
    DROP TABLE IF EXISTS contacts;
    DROP TABLE IF EXISTS messages;`);
  }

  async getList(table: string) : Promise<Contact[]> {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    if (!this.tables.includes(table)) {
      throw new Error("Invalid table");
    }
    return await this.db.getAllAsync(`SELECT * FROM ${table} ORDER BY firstName ASC`);
  }

  async getContact(id: string) : Promise<Contact | null> {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    if (!id) {
      throw new Error("id is required");
    }
    return await this.db.getFirstAsync(`SELECT * FROM contacts WHERE id = ?`, id);
  }

  async addContact(contact: Contact) {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    if (contact.firstName === "") {
      throw new Error("Invalid first name ");
    }
    if (contact.phone === "") {
      throw new Error("Invalid phone");
    }

    const columns: string[] = [];
    const values: string[] = [];

    for (const key in contact) {
      if (contact[key] !== "") {
        columns.push(key);
        values.push(contact[key]);
      }
    }

    const placeholders = columns.map(() => '?').join(', ');

    return await this.db.runAsync(
      `INSERT INTO contacts (${columns.join(', ')}) VALUES (${placeholders})`, values
    );
  }

  async editContact(contact: Contact) {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    if (!contact.id) {
      throw new Error("Invalid id");
    }

    const columns: string[] = [];
    const values: string[] = [];

    for (const key in contact) {
      if (contact[key] !== "") {
        columns.push(`${key} = ?`);
        values.push(contact[key]);
      }
    }

    values.push(String(contact.id));

    return await this.db.runAsync(
      `UPDATE contacts SET ${columns.join(', ')} WHERE id = ?`, values
    );
  }
  async deleteContact(id: string) {
    if (!this.db) {
      throw new Error("Set DB first");
    }
    if (!id) {
      throw new Error("Invalid id");
    }
    return await this.db.runAsync(
      `DELETE FROM contacts WHERE id = ?`, id
    );
  }
}