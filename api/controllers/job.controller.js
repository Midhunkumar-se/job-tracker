import ForbiddenError from "../errors/forbidden.js";
import BadRequestError from "../errors/bad-request.js";
import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";

export const createJob = async (req, res, next) => {
  try {
    if (!req.body.company || !req.body.position || !req.body.jobLocation) {
      throw new BadRequestError("Please provide all request fields");
    }

    const newJob = new Job({
      ...req.body,
      userId: req.user.id,
    });

    const job = await newJob.save();

    res.status(StatusCodes.CREATED).json({ msg: "Job Created", job });
  } catch (error) {
    next(error);
  }
};
