import { Router } from "express";
const router = Router();

import authRouter from "./auth.routes.js";
import mentorRouter from "./mentor.routes.js";

router.use("/api/auth", authRouter);
router.use("/api/mentors", mentorRouter);

export default router ;