import express from "express";
import { getAllQuestions, createQuestion, deleteQuestion, getSingleQuestion, likeQuestion, updateQuestion } from "../controllers/questions";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllQuestions);

router.get("/:id", verifyToken, getSingleQuestion);

/* CREATE */
router.post("/", verifyToken, createQuestion);

/* DELETE */
router.delete("/:id", verifyToken, deleteQuestion);

/* UPDATE */
router.put("/:id", verifyToken, updateQuestion);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likeQuestion);

export default router;
