import { Request, Response } from "express";
import User from "../models/User";
import { QueryResult } from "pg";
import { pool } from "./dbConnection";
import * as queries from "../models/Queries"

/**
 * create new user in db with input uname and pwd
 * @param req 
 * @param res 
 */

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
  })
};

export const updateUsername = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username } = req.body;
    const oldUser = await pool.query(queries.findUserById, [id]);
    if (oldUser.rowCount == 0) {
        res.status(400).json("User does not exist")
    }

    pool.query(queries.updateUsername, [username, id], (error: Error, results: QueryResult) => {
        if (error) throw error;
        res.status(200).json("updated successfully.");
    })
};

export const updateAdminStatus = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username, password, isAdmin} = req.body;
    const oldUser = await pool.query(queries.findUserById, [id]);
    if (oldUser.rowCount == 0) {
        res.status(400).json("User does not exist")
    }

    pool.query(queries.updateAdminStatus, [isAdmin, id], (error: Error, results: QueryResult) => {
        if (error) throw error;
        res.status(200).json("updated successfully.");
    })
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(queries.findUserById, [id], (error: Error, results: QueryResult) => {
      if (error) throw error;
      if (results.rowCount == 0) {
          res.status(404).json("User does not exist")
      } else {
          pool.query(queries.deleteUser, [id], (error: Error, results: QueryResult) => {
              if (error) throw error;
              res.status(200).json("deleted"); //might have some other errors here
          });
      }
  })
};


