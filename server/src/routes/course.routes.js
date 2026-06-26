import express from "express";
import courseController from "../controllers/course.controller.js";
import mentorAuth from "../middleware/auth.middleware.js";

const courseRouter = express.Router();

// Public Routes
courseRouter.get("/all", courseController.getAll);
courseRouter.get("/:id", courseController.getOne);

// Mentor Protected Routes
courseRouter.post("/create", mentorAuth, courseController.create);
courseRouter.patch("/:id", mentorAuth, courseController.update);
courseRouter.delete("/delete/:id", mentorAuth, courseController.delete);

export default courseRouter;
