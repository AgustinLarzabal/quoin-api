import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

class UserController {
  create = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        return res
          .status(400)
          .json("Mising required fields: email, passqord, username");
      }

      const user = await User.findOneBy({ email: email });
      if (user) {
        return res.status(409).json("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.save({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          email: newUser.email,
        },
        `${process.env.JWT_SIGNATURE}`,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json("Mising required fields: email, passqord, username");
      }

      const user = await User.findOneBy({ email: email });
      if (!user) {
        return res.status(409).json({ error: "user not found" });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          email: user.email,
        },
        `${process.env.JWT_SIGNATURE}`,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  profile = async (req: any, res: Response) => {
    try {
      const user = await User.findOneBy({ email: req.email });
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };
}

export default UserController;
