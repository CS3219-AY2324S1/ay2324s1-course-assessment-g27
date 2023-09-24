import express from "express";
import { getAllQuestions, createQuestion, deleteQuestion, getUserQuestions, likeQuestion } from "../controllers/questions";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllQuestions);
// router.get("/:userId/questions", verifyToken, getUserQuestions);

/* CREATE */
router.post("/", verifyToken, createQuestion);

/* DELETE */
router.delete("/:id", verifyToken, deleteQuestion);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likeQuestion);

export default router;
