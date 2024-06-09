import React from "react";
import logo from "../assets/logo.png";
import sideImage from "../assets/side-img.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let nav = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    nav("/login");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    nav("/register");
  };

  return (
    <header className="h-screen bg-[linear-gradient(to_bottom_left,#ffffff,#e1d5e0)]">
      <div className="max-w-[1200px] m-auto p-2.5 pl-10">
        <img src={logo} className="w-[170px] h-[30px]" />
      </div>
      <div className="flex flex-row justify-between items-center max-w-[1200px] h-4/5 m-auto p-2.5 px-10">
        <div className="pr-5">
          <h1 className="main-heading">
            Job <br className="hidden lg:block" />
            Tracking <br className="hidden lg:block" />
            Application
          </h1>
          <p className="max-w-[600px] leading-[27px]">
            Streamline your job search with our user-friendly application
            tracker, organizing and monitoring every step to help you land your
            dream job.
          </p>
          <div className="flex flex-row items-center mt-6 ">
            <button
              className="purple-button"
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="font-semibold px-3 text-4xl text-[#4b2255]">/</p>
            <button
              className="purple-button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
        <img
          className="max-w-[500px] hidden lg:block"
          src={sideImage}
          alt="listing job"
        />
      </div>
    </header>
  );
};

export default Landing;
