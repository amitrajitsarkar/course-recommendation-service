import express from "express";
import mentorController from "../controllers/mentor.controller.js";

const mentorRouter = express.Router();

mentorRouter.post("/create", mentorController.create);
mentorRouter.get("/all", mentorController.getAll);
mentorRouter.get("/:username", mentorController.getOne);
mentorRouter.patch("/:id", mentorController.update);
mentorRouter.delete("/delete/:username", mentorController.delete);

export default mentorRouter;