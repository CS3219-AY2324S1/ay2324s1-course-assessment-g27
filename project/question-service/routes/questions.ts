import express from "express";
import { getAllQuestions, createQuestion, deleteQuestion, getSingleQuestion, updateQuestion } from "../controllers/questions";
import { verifyToken, verifyIsAdmin } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllQuestions);

router.get("/:id", verifyToken, getSingleQuestion);

/* CREATE */
router.post("/", verifyToken, verifyIsAdmin, createQuestion);

/* DELETE */
router.delete("/:id", verifyToken, verifyIsAdmin, deleteQuestion);

/* UPDATE */
router.put("/:id", verifyToken, verifyIsAdmin, updateQuestion);

export default router;
