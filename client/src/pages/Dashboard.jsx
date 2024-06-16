import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashAddJob from "../components/DashAddJob";
import DashAllJobs from "../components/DashAllJobs";
import DashStats from "../components/DashStats";
import Header from "../components/Header";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          {/* Sidebar */}
          <DashSidebar />
        </div>
        {/* profile... */}
        {tab === "profile" && <DashProfile />}
        {/* posts... */}
        {tab === "addJob" && <DashAddJob />}
        {/* users */}
        {tab === "allJobs" && <DashAllJobs />}
        {/* comments  */}
        {tab === "stats" && <DashStats />}
      </div>
    </>
  );
}
