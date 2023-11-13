import express from "express";
import * as userControl from "../controllers/users";

const router = express.Router();

/* READ */
router.get("/", userControl.getAllUser);
router.get("/:id", userControl.findUserById);
router.put("/:id", userControl.updateUsername);
router.delete("/:id", userControl.deleteUser);


export default router;
