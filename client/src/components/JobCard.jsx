import React, { useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
day.extend(advancedFormat);

const JobCard = (props) => {
  const { jobData, deleteJob } = props;
  const { _id, company, position, jobStatus, jobType, jobLocation, createdAt } =
    jobData;
  const date = day(createdAt).format("MMM Do, YYYY");

  const [showModal, setShowModal] = useState(false);

  const handleDeleteJob = (deleteJobId) => {
    setShowModal(false);
    deleteJob(deleteJobId);
  };

  return (
    <div className="w-full flex flex-col rounded-sm box-shadow-2">
      <div className="flex gap-4 p-5 pb-3 border-b-2 border-b-slate-200">
        <div className="flex justify-center items-center rounded-sm w-12 h-12 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <h1 className="text-white text-3xl font-semibold">
            {company[0].toUpperCase()}
          </h1>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-950 font-medium">{position}</p>
          <p className="text-slate-500 text-[15px]">{company}</p>
        </div>
      </div>
      <div className="flex p-5 max-w-[380px] justify-between">
        <div className="flex flex-col">
          <div className="flex items-center rounded-full bg-slate-100 pr-3 mb-5">
            <div className="rounded-full p-2 bg-pink-100">
              <FaLocationArrow className="text-black p-0 m-0 text-[14px]" />
            </div>
            <p className=" text-[13px] text-slate-800 font-medium pl-3">
              {jobLocation}
            </p>
          </div>

          <div className="flex items-center rounded-full bg-slate-100 pr-3">
            <div className="rounded-full p-2 bg-pink-100">
              <FaBriefcase className="text-black p-0 m-0 text-[14px]" />
            </div>
            <p className=" text-[13px] text-slate-800 font-medium pl-3">
              {jobType}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center rounded-full bg-slate-100 pr-3 mb-5">
            <div className="rounded-full p-2 bg-pink-100">
              <FaCalendarAlt className="text-black p-0 m-0 text-[14px]" />
            </div>
            <p className=" text-[13px] text-slate-800 font-medium pl-3">
              {date}
            </p>
          </div>

          <p className={`text-center ${jobStatus}  rounded-sm`}>
            {jobStatus[0].toUpperCase() + jobStatus.slice(1, jobStatus.length)}
          </p>
        </div>
      </div>
      <div className="flex p-5 pt-3">
        <button className="text-[12px] text-white border-none rounded-sm bg-[linear-gradient(to_bottom_left,#7b507e,#4b2255)] hover:bg-[linear-gradient(to_top_right,#7b507e,#4b2255)] px-5 py-[5px] mr-2">
          Edit
        </button>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="text-[12px] text-white border-none rounded-sm bg-[linear-gradient(to_bottom_left,#b25656,#680404)] hover:bg-[linear-gradient(to_top_right,#b25656,#680404)] px-5 py-[5px]"
        >
          Delete
        </button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the{" "}
              <span className="font-medium">{position}</span> job at{" "}
              <span className="font-medium">{company}</span>?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteJob(_id)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobCard;
