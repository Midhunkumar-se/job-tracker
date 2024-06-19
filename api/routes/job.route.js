import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import { createJob, getAllJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createJob);
router.get("/getAllJobs", verifyToken, getAllJobs);

export default router;
