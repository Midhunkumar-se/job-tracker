import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

function DashAllJobs() {
  const [filterData, setFilterData] = useState({
    search: "",
    jobStatus: "all",
    jobType: "all",
    sort: "newest",
    page: 1,
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = `search=${filterData.search}&jobStatus=${filterData.jobStatus}&jobType=${filterData.jobType}&sort=${filterData.sort}&page=${filterData.page}`;
      const res = await fetch(`/api/job/getAllJobs?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filterData]);

  const handleChange = (e) => {
    if (e.target.id === "search") {
      setFilterData({ ...filterData, search: e.target.value });
    }
    if (e.target.id === "sort") {
      const sort = e.target.value || "newest";
      setFilterData({ ...filterData, sort: sort });
    }
    if (e.target.id === "jobStatus") {
      const jobStatus = e.target.value || "all";
      setFilterData({ ...filterData, jobStatus: jobStatus });
    }
    if (e.target.id === "jobType") {
      const jobType = e.target.value || "all";
      setFilterData({ ...filterData, jobType: jobType });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterData({
      search: "",
      jobStatus: "all",
      jobType: "all",
      sort: "newest",
      page: 1,
    });
  };

  return (
    <div className="p-12 w-full min-h-screen">
      <div className="p-5 pb-8 shadow-lg bg-white rounded-md bg-[linear-gradient(to_bottom_left,#F5E9F7,#ffffff)] mb-10">
        <div className="flex flex-col mb-7">
          <h1 className="text-[27px] p-0 m-0 font-medium">Search Form</h1>
          <div className="h-[4px] w-[25px] p-0 m-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 "
        >
          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="position"
            >
              Search
            </label>
            <input
              onChange={handleChange}
              value={filterData.search}
              type="text"
              placeholder="Search here..."
              id="search"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            />
          </div>

          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="job-status"
            >
              Job Status
            </label>
            <select
              onChange={handleChange}
              value={filterData.jobStatus}
              id="jobStatus"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="job-type"
            >
              Job Type
            </label>
            <select
              onChange={handleChange}
              value={filterData.jobType}
              id="jobType"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="job-type"
            >
              Sort
            </label>
            <select
              onChange={handleChange}
              value={filterData.sort}
              id="sort"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </div>

          <div className="w-full flex items-end">
            <Button
              className="w-[100%] rounded-[4px]"
              type="submit"
              gradientDuoTone="purpleToPink"
            >
              Reset Search Values
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col ">
        <h1 className="text-lg font-medium mb-5">
          {jobs.totalJobs} Jobs Found
        </h1>
        <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-2">
          {loading ? (
            <div className="flex w-full justify-end">
              <Spinner className="h-10 w-10" />
            </div>
          ) : jobs.totalJobs === 0 ? (
            <div className="text-end">
              <h1 className="font-medium text-xl">
                No jobs available at the moment.
              </h1>
            </div>
          ) : (
            jobs.jobs?.map((data) => {
              return <JobCard key={data._id} jobData={data} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DashAllJobs;
