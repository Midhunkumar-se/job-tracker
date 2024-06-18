import { Button } from "flowbite-react";

function DashAllJobs() {
  return (
    <div className="p-12 w-full h-screen">
      <div className="p-5 pb-8 shadow-lg bg-white rounded-md bg-[linear-gradient(to_bottom_left,#F5E9F7,#ffffff)]">
        <div className="flex flex-col mb-7">
          <h1 className="text-[27px] p-0 m-0 font-medium">Search Form</h1>
          <div className="h-[4px] w-[25px] p-0 m-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="position"
            >
              Search
            </label>
            <input
              type="text"
              placeholder="Search here..."
              required
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
              id="jobStatus"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
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
              id="jobType"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
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
              id="sort"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="ascending">a-z</option>
              <option value="descending">z-a</option>
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
    </div>
  );
}

export default DashAllJobs;
