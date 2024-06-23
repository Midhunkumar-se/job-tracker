"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { FaWpforms } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full lg:w-56 h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=addJob">
            <Sidebar.Item active={tab === "addJob"} icon={FaWpforms} as="div">
              Add Job
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=allJobs">
            <Sidebar.Item
              active={tab === "allJobs"}
              icon={MdQueryStats}
              as="div"
            >
              All Jobs
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=jobStats">
            <Sidebar.Item
              active={tab === "jobStats"}
              icon={IoBarChartSharp}
              as="div"
            >
              Stats
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              as="div"
              label={"User"}
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
