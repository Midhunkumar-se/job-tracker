import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const ErrorPage = () => {
  return (
    <div className="text-center ml-5 flex flex-col items-center">
      <Link className="" to="/">
        <img src={logo} className="mt-5" alt="logo" width={"160px"} />
      </Link>
      <h2 className="mt-4 text-red-700">Looking for something?</h2>
      <p className="mt-2 text-2xl">
        We're sorry. The Web address you entered is not a functioning page on
        our site.
      </p>
      <h2 className="mt-2">
        ▶ Go to Job Tracker's{" "}
        <Link className="text-purple-900 underline" to="/">
          Home
        </Link>{" "}
        Page
      </h2>
    </div>
  );
};

export default ErrorPage;
