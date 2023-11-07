import express from "express";
import * as auth from "../auth";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.post("/password/:id", auth.comparePwd)
router.put("/password/:id", auth.updatePwd);

export default router;
