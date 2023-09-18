import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password, 
      isAdmin,
      picturePath,
      questions,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash, 
      isAdmin,
      picturePath,
      questions,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne( { username: username });
    if (!user) return res.status(400).json({ msg: "User does not exist! "});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET!);
    const userWithoutPassword = {...user.toObject(), password: undefined};
    res.status(200).json({ token, userWithoutPassword });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
