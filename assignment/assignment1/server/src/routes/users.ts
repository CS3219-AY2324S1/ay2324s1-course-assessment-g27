import express from "express";
import * as userControl from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
//router.get("/:id", verifyToken, userControl.getAllUser); //idk if need to use the :id
router.get("/", userControl.getAllUser);
router.get("/:id", userControl.findUserById);
router.put("/:id", userControl.updateUser);
router.delete("/:id", userControl.deleteUser);


export default router;
