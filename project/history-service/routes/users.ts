import express from "express";
import * as userControl from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/:id/attempts", verifyToken, userControl.getAttemptList);
router.post("/:id/attempts", verifyToken, userControl.addAttemptedQns);
router.put("/:id/attempts", verifyToken, userControl.updateCompletedQns);
export default router;
