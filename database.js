require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({

    connectionString: process.env.DATABASE_URL,

    ssl: process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false
        }
        : false

});

async function initDatabase() {

    try {

        await pool.query(`

            CREATE TABLE IF NOT EXISTS tasks (

                id SERIAL PRIMARY KEY,

                playlist_url TEXT NOT NULL,

                start_time VARCHAR(10) NOT NULL,

                duration INTEGER NOT NULL,

                repeat_delay INTEGER NOT NULL,

                status VARCHAR(20) DEFAULT 'running'

            )

        `);

        console.log("PostgreSQL Connected");

    }

    catch(err){

        console.log(err);

    }

}

initDatabase();

module.exports = pool;
