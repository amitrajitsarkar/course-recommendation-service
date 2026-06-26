import { Router } from "express";
const router = Router();

import authRouter from "./auth.routes.js";
import mentorRouter from "./mentor.routes.js";
import courseRoutes from "./course.routes.js";
import recomendationRouter from "./recommendation.routes.js";


router.use("/api/auth", authRouter);
router.use("/api/mentors", mentorRouter);
router.use("/api/courses", courseRoutes);
router.use("/api/student", recomendationRouter);

export default router ;