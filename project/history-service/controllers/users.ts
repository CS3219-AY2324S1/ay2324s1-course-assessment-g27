import { Request, Response } from "express";
import { pool } from "../db";
import * as queries from "../db/dbQueries";

//adds a question that user attempted as a quesiton ID into the sql DB
export const addAttemptedQns = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const { qid, attempt } = req.body; 
        const response = await pool.query(queries.addAttempt, [id, qid, attempt]);
        console.log(`added attempt`, qid);
        res.status(201).json(`added attempt ${qid}`);
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

export const updateCompletedQns = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const { qid, isCompleted } = req.body;
        const results = await pool.query(queries.completedAttempt, [isCompleted, qid, id]);
        res.status(200).json(results.rows);
        return;
    } catch (err:any) {
        throw err;
    }
};


