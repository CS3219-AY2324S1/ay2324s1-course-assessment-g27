import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header("Authorization");
    
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = verified;
    next();
  } catch (err: any) {
    console.error( `verifyToken has error ${err}`);
    res.status(500).json({ error: err.message });
  }
}

export const verifyIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!(req as any).user.isAdmin) {
        return res.status(401).send("You must be admin to perform the operation!");
    }
    next();
  } catch (err: any) {
    console.error("verifyIsAdmin has error");
    res.status(500).json({ error: err.message });
  }
}
