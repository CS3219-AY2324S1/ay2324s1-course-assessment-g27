import { Pool } from "pg";

export const db = 
`DROP TABLE IF EXISTS attempted_qns, completed_qns CASCADE;
CREATE TABLE IF NOT EXISTS attempted_qns (
    id INT,
    qid TEXT NOT NULL,
    attempted_date TIMESTAMP NOT NULL,
    FOREIGN KEY(id) REFERENCES users(id),
    PRIMARY KEY (id, qid)
);
CREATE TABLE IF NOT EXISTS completed_qns (
    id INT,
    qid TEXT NOT NULL,
    completed_date TIMESTAMP NOT NULL,
    FOREIGN KEY(id) REFERENCES users(id),
    PRIMARY KEY (id, qid)
);

CREATE OR REPLACE FUNCTION incomplete_completed()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM completed_qns WHERE id = NEW.id and qid = NEW.qid) AND
     EXISTS (SELECT 1 FROM completed_qns) THEN
    DELETE FROM completed_qns
    WHERE id = NEW.id and qid = NEW.qid;
    RETURN NULL;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER incomplete_completed_trigger
AFTER INSERT ON attempted_qns
FOR EACH ROW
EXECUTE FUNCTION incomplete_completed();

CREATE OR REPLACE FUNCTION complete_attempt()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM attempted_qns WHERE id = NEW.id and qid = NEW.qid) AND
     EXISTS (SELECT 1 FROM attempted_qns) THEN
    DELETE FROM attempted_qns
    WHERE id = NEW.id and qid = NEW.qid;
    RETURN NULL;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER complete_attempt_trigger
AFTER INSERT ON completed_qns
FOR EACH ROW
EXECUTE FUNCTION complete_attempt();
`;

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
