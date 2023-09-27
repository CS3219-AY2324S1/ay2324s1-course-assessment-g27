import { Pool } from "pg";

/**
 * Connection to your psql database 
 * (using local db for now)
 */

//change the fields as you need, but this should be the default
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
});

const table = "CREATE TABLE IF NOT EXISTS users (id SERIAL,uname VARCHAR(20) UNIQUE NOT NULL,pwd TEXT NOT NULL,PRIMARY KEY(id));";

async function seedDb() {
    const conn = await pool.connect();
    conn.query(table)
}

seedDb();