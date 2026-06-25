import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authController = new AuthController;

const authRouter = express.Router();

authRouter.post("/register", authController.signup);
authRouter.post("/login", authController.login);
authRouter.delete("/delete", authController.delete);

export default authRouter;