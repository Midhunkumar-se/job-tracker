import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import { createJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createJob);

export default router;
