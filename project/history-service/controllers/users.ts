import { Request, Response } from "express";
import { pool } from "../db";
import * as queries from "../db/dbQueries";

//adds a question that user attempted as a quesiton ID into the sql DB
export const addAttemptedQns = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const { qid } = req.body; 
        const response = await pool.query(queries.addAttempt, [id, qid]);
        console.log(`added attempt`, qid);
        res.status(201).json(`added attempt ${qid}`);
        return;
    } catch (err:any) {
        throw err;
    }
};

export const addCompletedQns = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const { qid } = req.body; 
        const response = await pool.query(queries.addCompleted, [id, qid]);
        console.log(`added completed ${qid}`);
        res.status(201).json(`added completed ${qid}`);
        return;
    } catch (err:any) {
        throw err;
    }
};

export const getAttemptList = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getAttempts, [id]);
        res.status(200).json(results.rows);
        return;
    } catch (err:any) {
        throw err;
    }
};

export const getCompletedList = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getCompleted, [id]);
        res.status(200).json(results.rows);
        return;
    } catch (err:any) {
        throw err;
    }
};


