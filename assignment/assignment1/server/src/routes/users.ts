import express from "express";
import {
  getUser,
} from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

export default router;
