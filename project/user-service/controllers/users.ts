import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../db";
import * as queries from "../db/dbQueries";
import bcrypt from "bcrypt";

export const findUserByUname = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  pool.query(queries.findUserByUname, [username], (error: Error, results: QueryResult) => {
      if (error) throw error;
      if (results.rowCount == 0) {
          res.status(400).json("User not found");
      } else {
          res.status(200).json(results.rows);
          console.log(results.rows[0].username);
      }
  })
};

export const findUserById = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const id = parseInt(req.params.id);
    pool.query(queries.findUserById, [id], (error: Error, results: QueryResult) => {
        if (error) throw error;
        if (results.rowCount == 0) {
            res.status(400).json("User not found");
        } else {
            res.status(200).json(results.rows);
            console.log(results.rows[0].username);
        }
    })
  };

export const getAllUser = async (req: Request, res: Response) => {
  pool.query(queries.getAllUsers, (error: Error, results: QueryResult) => {
      if (error) throw error;
      res.status(200).json(results.rows);
      return;
  })
};

export const updateUsername = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { username } = req.body;
        const oldUser = await pool.query(queries.findUserById, [id]);
        if (oldUser.rowCount == 0) {
            res.status(400).json("User does not exist");
            return;
        }

        const newUser = await pool.query(queries.findOtherUsers, [username, id]);
        if (newUser.rowCount > 0) {
            res.status(409).json("Username already exists");
            return;
        }

        pool.query(queries.updateUsername, [username, id], (error: Error, results: QueryResult) => {
            if (error) throw error;
            res.status(200).json("Updated successfully");
            return;
        })
    } catch (err:any) {
        throw err;
    }
};

export const updateAdminStatus = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username, password, isAdmin} = req.body;
    const oldUser = await pool.query(queries.findUserById, [id]);
    if (oldUser.rowCount == 0) {
        res.status(400).json("User does not exist")
        return;
    }

    pool.query(queries.updateAdminStatus, [isAdmin, id], (error: Error, results: QueryResult) => {
        if (error) throw error;
        res.status(200).json("Updated successfully");
        return;
    })
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const response = await pool.query(queries.findUserById, [id]);
    if (response.rowCount == 0) {
        res.status(400).json("User does not exist");
        return;
    }
    const deletedRes = await pool.query(queries.deleteUser, [id]);
    res.status(200).json("Deleted");
    return;
  } catch (err:any) {
    throw err;
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


