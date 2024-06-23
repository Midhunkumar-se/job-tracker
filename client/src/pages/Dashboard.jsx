import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashAddJob from "../components/DashAddJob";
import DashAllJobs from "../components/DashAllJobs";
import DashStats from "../components/DashStats";
import Header from "../components/Header";
import DashUpdateJob from "../components/DashUpdateJob";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const jobIdFromUrl = urlParams.get("updateJobId");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    if (jobIdFromUrl) {
      setJobId(jobIdFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Header />
      <div className="h-full flex flex-col md:flex-row ">
        <div className="md:w-56">
          {/* Sidebar */}
          <DashSidebar />
        </div>
        {/* profile... */}
        {tab === "profile" && <DashProfile />}
        {/* Jobs... */}
        {tab === "addJob" && <DashAddJob />}
        {/* Update Job... */}
        {tab === "updateJob" && jobId && <DashUpdateJob />}

        {/* users */}
        {tab === "allJobs" && <DashAllJobs />}
        {/* job Stats  */}
        {tab === "jobStats" && <DashStats />}
      </div>
    </>
  );
}
