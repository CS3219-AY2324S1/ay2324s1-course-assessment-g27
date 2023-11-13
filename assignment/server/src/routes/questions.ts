import express from "express";
import { getAllQuestions, createQuestion, deleteQuestion, getSingleQuestion, likeQuestion, updateQuestion } from "../controllers/questions";

const router = express.Router();

/* READ */
router.get("/", getAllQuestions);

router.get("/:id", getSingleQuestion);

/* CREATE */
router.post("/", createQuestion);

/* DELETE */
router.delete("/:id", deleteQuestion);

/* UPDATE */
router.put("/:id", updateQuestion);

export default router;
