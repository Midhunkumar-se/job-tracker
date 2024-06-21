import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashUpdateJob() {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    jobStatus: "pending",
    jobType: "full-time",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/job/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        toast.success(data.msg);
        setFormData({
          position: "",
          company: "",
          jobLocation: "",
          jobStatus: "pending",
          jobType: "full-time",
        });
        navigate("/dashboard?tab=allJobs");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    setFormData({
      ...formData,
      [id]: value.trim(),
    });
  };

  return (
    <div className="p-12 w-full h-screen">
      <div className="p-5 pb-8 shadow-lg bg-white rounded-md bg-[linear-gradient(to_bottom_left,#F5E9F7,#ffffff)]">
        <div className="flex flex-col mb-7">
          <h1 className="text-[27px] p-0 m-0 font-medium">Update Job</h1>
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
              Position
            </label>
            <input
              type="text"
              placeholder="Position"
              required
              value={formData.position}
              id="position"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="company"
            >
              Company
            </label>
            <input
              type="text"
              placeholder="Company"
              required
              value={formData.company}
              id="company"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col">
            <label
              className="text-[17px] font-medium text-black mb-1"
              value="location"
            >
              Job Location
            </label>
            <input
              type="text"
              placeholder="Job Location"
              required
              value={formData.jobLocation}
              id="jobLocation"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
              onChange={handleChange}
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
              value={formData.jobStatus}
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
              value={formData.jobType}
              onChange={handleChange}
              id="jobType"
              className="flex-1 border-2 border-gray-300 bg-gray-50 rounded-[4px] p-[6px] outline-none focus:border-purple-900 focus:outline-none"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="w-full flex items-end">
            <Button
              className="w-[100%] rounded-[4px]"
              type="submit"
              gradientDuoTone="purpleToPink"
            >
              Update Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashUpdateJob;
