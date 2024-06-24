import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (req: any, res: Response, next: any) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  token = token.split(" ")[1];

  try {
    // PONER LA PALABRA SECRETA EN UNA ENV
    const { email } = jwt.verify(token, "palabrasecreta") as JwtPayload;

    req.email = email;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid token" });
  }
};
