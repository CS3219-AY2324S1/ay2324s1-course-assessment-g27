import { Pool } from "pg";

/**
 * Connection to your psql database 
 * (using local db for now)
 */
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "User Profiles",
    password: "postgres",
    port: 5432,
});