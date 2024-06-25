import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_ENTRIES = 'myEntries'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
   }

  async initializeDatabase() {
    this.db = await this.sqlite.createConnection(
      DB_ENTRIES,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      date TEXT,
      location TEXT,
      photo TEXT
    );`;

    await this.db.execute(schema);
  }

  async addEntry(entry: any) {
    const { title, content, date, location, photo } = entry;
    await this.db.run(
      `INSERT INTO entries (title, content, date, location, photo) VALUES (?, ?, ?, ?, ?)`,
      [title, content, date, location, photo]
    );
  }

  async getEntries(): Promise<any[]> {
    const res = await this.db.query('SELECT * FROM entries');
    return res.values || [];
  }

  async deleteEntry(id: number) {
    await this.db.run(`DELETE FROM entries WHERE id = ?`, [id])

  }

  async updateEntry(entry: any) {
    const { id, title, content, date, location, photo } = entry;
    await this.db.run(
      `UPDATE entries SET title = ?, content = ?, date = ?, location = ?, photo = ? WHERE id = ?`,
      [title, content, date, location, photo, id]
    );
  }
}
