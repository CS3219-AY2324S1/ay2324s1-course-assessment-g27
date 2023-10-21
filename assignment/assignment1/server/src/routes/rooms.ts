import express from "express";
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

/* GET by diff */
// router.get("/", verifyToken, getRoomByDifficulty);

export default router;