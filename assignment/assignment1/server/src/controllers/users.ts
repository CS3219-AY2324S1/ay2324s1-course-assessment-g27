import { Request, Response } from "express";
//import User from "../models/User";
import { QueryResult } from "pg";
import { pool } from "./dbConnection";
import * as queries from "../models/Queries"

/* ALL FUNCTIONS USES UNAME AND PWD TO QUERY */
/* can also change to using id if need be */
/**
 * create new user in db with input uname and pwd
 * @param req 
 * @param res 
 */
export const newUser = async (req: Request, res: Response) => {
  //check if user exists
  const { uname, pwd } = req.body;
  const result = await pool.query(queries.checkUserExists, [uname]);
  if (result.rowCount > 0) {
      res.status(409).json("User already exists");
      console.log("duplicate");
  } else {
      const { uname, pwd } = req.body;
      const result = pool.query(queries.insertNewUser, 
          [uname, pwd], 
          (error: Error, results: QueryResult) => {
              if (error) throw error;
              res.status(201).json("User registered");
              console.log("new user");
          });
      }
};


export const getUserByUname = async (req: Request, res: Response) => {
  const uname = req.body.uname; //here idk whether to use req.params or req.body, but the latter worked in postman
  pool.query(queries.searchByUname, [uname], (error: Error, results: QueryResult) => {
      if (error) throw error;
      if (results.rowCount == 0) {
          res.status(404).json("User not found");
      } else {
          res.status(200).json(results.rows);
      }
  })
};

export const getAllUser = (req: Request, res: Response) => {
  pool.query(queries.getAllUsers, (error: Error, results: QueryResult) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  })
};

export const deleteUser = (req: Request, res: Response) => {
  const uname = req.body.uname;
  pool.query(queries.searchByUname, [uname], (error: Error, results: QueryResult) => {
      if (error) throw error;
      if (results.rowCount == 0) {
          res.status(404).json("User does not exist")
      } else {
          pool.query(queries.deleteUser, [uname], (error: Error, results: QueryResult) => {
              if (error) throw error;
              res.status(200).json("deleted"); //might have some other errors here
          });
      }
  })
};


export const loginUser = async (req: Request, res: Response) => {
  const uname = req.params.uname;
  const pwd = req.params.pwd;
  const results = await pool.query(queries.loginUserAuth, [uname, pwd]);
  if (results.rowCount > 0) {
      res.status(200).json("login successful");
  } else {
      res.status(404).json("user does not exist");
  }
};

