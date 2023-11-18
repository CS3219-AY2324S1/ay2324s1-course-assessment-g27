/* SQL Queries */
const user_table = "users";

/**
 * Check if a new user already exists
 * at the time of registering
 */
export const checkUserExists = `SELECT 1 FROM users WHERE username = $1`;

/**
 * Adding a new user to the db
 */
export const insertNewUser = "INSERT INTO users (username, password) VALUES ($1, $2)";

/**
 * Returns desired user(s)
 */
export const getAllUsers = "SELECT * FROM users";
export const findUserById = "SELECT * FROM users WHERE id = $1";
export const findUserByUname = "SELECT * FROM users WHERE username = $1";
export const findOtherUsers = "SELECT * FROM users WHERE username = $1 and id != $2";

/**
 * Updating user info, assuming you know the id
 */
export const updateUsername = "UPDATE users SET username = $1 WHERE id = $2";
export const updatePwd = "UPDATE users SET password = $1 WHERE id = $2";
export const updateAdminStatus = "UPDATE users SET isAdmin = $1 WHERE id = $2";

/**
 * Finds a user from an input username and
 * deletes it from the db
 */
export const deleteUser = "DELETE FROM users WHERE id = $1";
