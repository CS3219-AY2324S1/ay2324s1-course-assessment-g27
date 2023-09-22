import { Request, Response } from "express";
import Question from "../models/Question";

/* CREATE */
export const createQuestion = async (req: Request, res: Response) => {
  try {  
    const { title, difficulty, description, examples, constraints, tags, picturePath } = req.body;
    const newQuestion = new Question({
      title: title,
      difficulty: difficulty,
      description: description,
      examples: examples,
      constraints: constraints,
      tags: tags,
      // picturePath: picturePath,
    });

    await newQuestion.save();

    const question = await Question.find();
    res.status(201).json(question);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
}

/* READ */
/**
 * Gets list of all questions.
 */
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const question = await Question.find();
    res.status(200).json(question);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * TODO: Gets list of all the questions user has done.
 */
export const getUserQuestions = async (req: Request, res: Response) => {
  try {
    // res.status(200).json(questions);
  } catch (err) {
    // res.status(404).json({ message: err.message });
  }
}

/* UPDATE */
/**
 * TODO: Update number of likes.
 */
export const likeQuestion = async (req: Request, res: Response) => {
  try {
    // const { username } = req.params;
    // const questions = await Question.find({ username });
    // res.status(200).json(questions);
  } catch (err) {
    // res.status(404).json({ message: err.message });
  }
}
