import { Request, Response } from "express";
import User from "../models/User";

/* READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(404).json( {message: err.message });
  }
}
