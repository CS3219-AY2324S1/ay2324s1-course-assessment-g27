import { Pool } from "pg";

/**
 * Connection to your psql database 
 * (using local db for now)
 */
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
});