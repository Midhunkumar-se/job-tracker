import BadRequestError from "../errors/bad-request.js";
import ForbiddenError from "../errors/forbidden.js";
import Job from "../models/job.model.js";
import day from "dayjs";
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
    res.status(StatusCodes.OK).json({ msg: "job deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throw new ForbiddenError("You are not allowed to update this post");
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.jobId,
      {
        $set: {
          company: req.body.company,
          position: req.body.position,
          jobLocation: req.body.jobLocation,
          jobStatus: req.body.jobStatus,
          jobType: req.body.jobType,
        },
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
  } catch (error) {
    next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throw new ForbiddenError("You are not allowed to update this post");
    }

    console.log(req.params.jobId, req.params.userId);

    const job = await Job.findOne({ _id: req.params.jobId });
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    next(error);
  }
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { userId: req.user.id } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { userId: req.user.id } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
