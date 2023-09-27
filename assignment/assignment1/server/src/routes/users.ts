import express from "express";
import * as userControl from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
//router.get("/:id", verifyToken, userControl.getAllUser); //idk if need to use the :id
router.get("/", verifyToken, userControl.getAllUser);
router.get("/find", userControl.getUserByUname);
router.post("/register", userControl.newUser);
router.delete("/", userControl.deleteUser);


export default router;
