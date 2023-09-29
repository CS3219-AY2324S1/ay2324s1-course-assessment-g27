import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";
import { pool } from "./dbConnection";
import * as queries from "../models/Queries";
import { QueryResult } from "pg";

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password, 
      // isAdmin,
      // picturePath,
      // questions,
    } = req.body;
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(queries.checkUserExists, [username]);
    if (result.rowCount > 0) {
        res.status(409).json("User already exists");
        console.log("duplicate");
    } else {
        console.log(passwordHash);
        const result = pool.query(queries.insertNewUser, 
            [username, passwordHash], 
            (error: Error, results: QueryResult) => {
                if (error) throw error;
                console.log("user:", username);
                res.status(201).json("new user: "+username);
            });
        }
    
  } catch (err: any) {
    console.error("register has error");
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const results = await pool.query(queries.findUserByUname, [username]);
    if (results.rowCount == 0) {
        return res.status(400).json({ msg: "User does not exist! "});
    }
    const id = results.rows[0].id;
    const uname = results.rows[0].username;
    const pwd = results.rows[0].password;
    console.log("user:", results.rows[0].username);

    const isMatch = await bcrypt.compare(password, pwd);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

    const token = jwt.sign({ id: id}, process.env.JWT_SECRET!);
    const user = new User(uname, pwd);
    const userWithoutPassword = {user, password: undefined};
    res.status(200).json({ token, userWithoutPassword});
  } catch (err: any) {
    console.error("login has error");
    res.status(500).json({ error: err.message });
  }
}
