const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/youtube.db", (err) => {

    if (err) {

        console.log("Database Error");

        console.log(err);

        return;

    }

    console.log("SQLite Connected");

});

db.serialize(() => {

    db.run(`

        CREATE TABLE IF NOT EXISTS tasks (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            playlist_url TEXT NOT NULL,

            start_time TEXT NOT NULL,

            duration INTEGER NOT NULL,

            repeat_delay INTEGER DEFAULT 5,

            status TEXT DEFAULT 'running',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )

    `);

});

module.exports = db;