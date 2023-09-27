/* SQL Queries */

/**
 * Check if a new user already exists
 * at the time of registering
 */
export const checkUserExists = "SELECT 1 FROM users WHERE uname = $1";

/**
 * Adding a new user to the db
 */
export const insertNewUser = "INSERT INTO users (uname, pwd) VALUES ($1, $2)";

/**
 * Returns desired user(s)
 */
export const getAllUsers = "SELECT * FROM users";
export const searchByUname = "SELECT * FROM users WHERE uname = $1";

/**
 * Updating user info
 */
export const updateUname = "UPDATE users SET uname = $1 WHERE uname = $2";
export const updatePwd = "UPDATE users SET pwd = $1 WHERE uname = $2";

/**
 * Finds a user from an input username and
 * deletes it from the db
 */
export const deleteUser = "DELETE FROM users WHERE uname = $1";

/**
 * Matches both username and pwd with inputs 
 * with entries in the db
 */
export const loginUserAuth = "SELECT id, uname, pwd FROM users WHERE uname = $1 AND pwd = $2";