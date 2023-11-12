import { Pool } from "pg";
const POSTGRES_PASSWORD= `cs3219-g27`;
const POSTGRES_DB= `postgres`;
const POSTGRES_USER= `postgres`;
const POSTGRES_HOST= `34.142.136.87`;
const POSTGRES_PORT= 5432;

/**
 * Connection to your psql database 
 * (using local db for now)
 */
// export const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "postgres",
//     password: "postgres",
//     port: 5432,
// });

export const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
  });
