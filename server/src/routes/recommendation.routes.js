import express from "express";
import recommendationController from "../controllers/recomendation.controller.js";
import studentMiddleware from "../middleware/student.middleware.js";

const recomendationRouter = express.Router();

recomendationRouter.get("/recommendations", studentMiddleware, recommendationController.recommend);

export default recomendationRouter;