import { Pool } from "pg";
import { db } from "./sqlDb";

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


export async function seedDb() {
    const conn = await pool.connect();
    console.log("initialising");
    conn.query(db);
    console.log("users db initialised");
}

seedDb();
