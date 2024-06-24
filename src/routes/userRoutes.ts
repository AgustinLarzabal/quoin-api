import { Router } from "express";
import UserController from "../controllers/userController";
import { verifyToken } from "../middlewares/jwt.middleware";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/signup", userController.create);
userRouter.post("/login", userController.login);

userRouter.get("/profile", verifyToken, userController.profile);

export default userRouter;
