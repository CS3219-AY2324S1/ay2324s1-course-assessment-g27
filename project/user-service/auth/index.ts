import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";
import { pool } from "../db";
import * as queries from "../db/dbQueries";
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
        console.log("duplicate: ", username);
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
        return res.status(400).json("User does not exist! ");
    }
    const result = results.rows[0];
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) return res.status(400).json("Invalid username or password. ");

    const token = jwt.sign({ id: result.id, isAdmin: result.isadmin}, process.env.JWT_SECRET!);

    const id = result.id;
    const uname = result.username;
    const isAdmin = result.isadmin;
    const userWithoutPassword = new User(id, uname, '', isAdmin)
    res.status(200).json({ token, userWithoutPassword});
  } catch (err: any) {
    console.error("login has error");
    res.status(500).json({ error: err.message });
  }
};

export const comparePwd = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { password } = req.body;
  console.log(password);
  const oldUser = await pool.query(queries.findUserById, [id]);
  if (oldUser.rowCount == 0) {
      res.status(400).json("User does not exist")
  }
  
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const result = oldUser.rows[0];
  const isMatch = await bcrypt.compare(password, result.password);
  if (!isMatch) {
    res.status(400).json("Old password is incorrect");
    return
  }
  res.status(200).json("Passwords match");
};

export const updatePwd = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { password } = req.body;
  const oldUser = await pool.query(queries.findUserById, [id]);
  if (oldUser.rowCount == 0) {
      res.status(400).json("User does not exist")
  }
  
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  pool.query(queries.updatePwd, [passwordHash, id], (error: Error, results: QueryResult) => {
      if (error) throw error;
      res.status(200).json("updated successfully.");
  })
};

