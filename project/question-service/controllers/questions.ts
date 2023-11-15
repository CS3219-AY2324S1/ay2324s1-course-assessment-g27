import { Request, Response } from "express";
import Question from "../models/Question";

/* CREATE */
export const createQuestion = async (req: Request, res: Response) => {
  try {  
    const { title, difficulty, description, examples, constraints, tags, picturePath } = req.body;
    const titleTaken = await Question.findOne({ "title": { 
      "$regex": "^" + title + "\\b", "$options": "i"
    }});
    if (titleTaken) {
      return res.status(400).json({ message: "Title is already in use! Please enter new title" });
    }
    
    const newQuestion = new Question({
      title: title,
      difficulty: difficulty,
      description: description,
      examples: examples,
      constraints: constraints,
      tags: tags,
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
export const getSingleQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findOne({ _id: questionId });
    res.status(200).json(question);
  } catch (err:any) {
    res.status(404).json({ message: err.message });
  }
}

/* DELETE */
export const deleteQuestion = async(req: Request, res: Response) => {
  try {
    const questionId = req.params.id; 
    
    const deletedQuestion = await Question.deleteOne({ _id: questionId });

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question is not found' });
    }

    res.status(200).json({deletedQuestion});
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }

}
/* UPDATE */
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;
    const {title, difficulty, description, examples, constraints, tags} = req.body;
    const oldData = await Question.findById(questionId);
    const titleTaken = await Question.findOne({ "title": { 
      "$regex": "^" + title + "\\b", "$options": "i"
    }})
    if (titleTaken && oldData?.title != title) {
      return res.status(400).json({ message: "Title is already in use! Please enter new title" });
    }

    const updatedQuestion = await Question.findByIdAndUpdate( questionId, {title, difficulty, description, examples, constraints, tags});

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question is not found' });
    }
    res.json(updatedQuestion);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

