import Database from "better-sqlite3"
import path from "path"

const db = new Database(
  path.join(__dirname, "../../../temp/mail.db"),
  { verbose: console.log }
)

db.exec(`CREATE TABLE IF NOT EXISTS mails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER,          -- maps to users.id
  uid INTEGER,               -- IMAP UID
  from_address TEXT,
  to_address TEXT,
  subject TEXT,
  body TEXT,
  html TEXT,
  flags TEXT,                -- JSON: ["seen"]
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(owner_id) REFERENCES users(id)
);`)

export function getMails(limit: number, offset: number) {

}

export function getMail(id: number) { }

export function deleteMail(id: number) { }
