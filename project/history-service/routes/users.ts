import express from "express";
import * as userControl from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/:id/attempts", verifyToken, userControl.getAttemptList);
router.get("/:id/completed", verifyToken, userControl.getCompletedList);
router.post("/:id/attempts", verifyToken, userControl.addAttemptedQns);
router.post("/:id/completed", verifyToken, userControl.addCompletedQns);

export default router;
