import express from "express";
import { codeExec } from "../controllers/code";
import { createRoom, updateRoom, deleteRoom, getRoomDetails} from "../controllers/rooms";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createRoom);

/* DELETE */
router.delete("/:id", verifyToken, deleteRoom);

/* UPDATE */
router.put("/:id", verifyToken, updateRoom);

/* GET */
router.get("/:id", verifyToken, getRoomDetails);

router.post("/code", verifyToken, codeExec);

export default router;
