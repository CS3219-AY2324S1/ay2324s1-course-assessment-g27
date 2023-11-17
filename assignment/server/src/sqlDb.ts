export const db = 
`DROP TABLE IF EXISTS users, user_info, attempted_qns, completed_qns CASCADE;
CREATE TABLE users (
    id INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    isAdmin BOOLEAN DEFAULT false, 
    PRIMARY KEY(id)
);
CREATE TABLE user_info (
    id INT PRIMARY KEY,
    dname TEXT NOT NULL,
    pic_path TEXT DEFAULT '',
    FOREIGN KEY(id) REFERENCES users(id)
);
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