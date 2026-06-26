import express from "express";
import mentorController from "../controllers/mentor.controller.js";
import mentorLoginController from "../controllers/mentorLogin.controller.js";

const mentorRouter = express.Router();

mentorRouter.post("/signup", mentorLoginController.signup);
mentorRouter.post("/login", mentorLoginController.login);

mentorRouter.get("/all", mentorController.getAll);
mentorRouter.get("/:username", mentorController.getOne);
mentorRouter.patch("/:id", mentorController.update);
mentorRouter.delete("/delete/:username", mentorController.delete);

export default mentorRouter;
