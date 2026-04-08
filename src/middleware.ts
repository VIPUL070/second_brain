import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js"; 
import type { Request, NextFunction, Response } from "express";

interface AuthRequest extends Request {
  userId: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid Auth Header"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as jwt.JwtPayload;
    //beacuse jwt.verify( return string or jwt.JwtPayload object) so string doesnt have .userId prop 
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}