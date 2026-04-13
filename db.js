import Database from 'better-sqlite3';
const db=new Database('book.db');
db.exec(`
    CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER,
    genre TEXT DEFAULT 'General',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
);
const count=db.prepare('SELECT COUNT(*) as c FROM books').get().c;
if(count===0) {
    const insert=db.prepare('INSERT INTO books(title,author,year) VALUES(?,?,?)');
    insert.run('Clean Code','Robert Martin',2008);
    insert.run('The Progmatic Programmer','Hunt&Thomas',1999);
}
export default db;