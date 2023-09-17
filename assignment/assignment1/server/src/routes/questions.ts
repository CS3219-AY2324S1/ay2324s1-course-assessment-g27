import express from "express";
import { getAllQuestions, getUserQuestions, likeQuestion } from "../controllers/questions";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllQuestions);
router.get("/:userId/questions", verifyToken, getUserQuestions);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeQuestion);

export default router;
