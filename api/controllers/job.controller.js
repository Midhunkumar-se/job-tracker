import BadRequestError from "../errors/bad-request.js";
import ForbiddenError from "../errors/forbidden.js";
import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    userId: req.user.id,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobLocation: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

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

export const deleteJob = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throw new ForbiddenError("You are not allowed to delete this job");
    }

    await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json({ msg: "job deleted" });
  } catch (error) {
    next(error);
  }
};
