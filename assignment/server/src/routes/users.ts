import express from "express";
import * as userControl from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, userControl.getAllUser);
router.get("/:id", verifyToken, userControl.findUserById);
router.put("/:id", verifyToken, userControl.updateUsername);
router.delete("/:id", verifyToken, userControl.deleteUser);

router.get("/:id/attempts", verifyToken, userControl.getAttemptList);
router.get("/:id/completed", verifyToken, userControl.getCompletedList);
router.post("/:id/attempts", verifyToken, userControl.addAttemptedQns);
router.post("/:id/completed", verifyToken, userControl.addCompletedQns);


export default router;
