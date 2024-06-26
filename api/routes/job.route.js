import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  showStats,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createJob);
router.get("/getAllJobs", verifyToken, getAllJobs);
router.get("/getJob/:jobId/:userId", verifyToken, getJob);
router.get("/getJobStats", verifyToken, showStats);
router.delete("/deleteJob/:jobId/:userId", verifyToken, deleteJob);
router.put("/updateJob/:jobId/:userId", verifyToken, updateJob);

export default router;
