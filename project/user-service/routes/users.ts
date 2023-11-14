import express from "express";
import * as userControl from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, userControl.getAllUser);
router.get("/:id", verifyToken, userControl.findUserById);
router.put("/:id", verifyToken, userControl.updateUsername);
router.delete("/:id", verifyToken, userControl.deleteUser);
router.post("/password/:id", verifyToken, userControl.comparePwd)
router.put("/password/:id", verifyToken, userControl.updatePwd);

export default router;
