import { Pool } from "pg";
import { db } from "./sqlDb";
import { pool } from "./controllers/dbConnection";

export async function seedDb() {
    const conn = await pool.connect();
    console.log("initialising");
    conn.query(db);
    console.log("users db initialised");
}

seedDb();
