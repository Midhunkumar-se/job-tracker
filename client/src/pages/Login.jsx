import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import logo from "../assets/logo.png";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  useEffect(() => {
    dispatch(loginFailure(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(loginFailure("Please fill out all fields."));
    }
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
      }
      if (res.ok) {
        dispatch(loginSuccess(data));
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(loginFailure(data.message));
    }
  };

  return (
    <div className="bg-[linear-gradient(to_bottom_left,#ffffff,#e1d5e0)] h-lvh pt-[60px] flex flex-col  items-center">
      <div className="bg-[linear-gradient(to_bottom_left,#ffffff,#F6E8FF)] flex flex-col justify-center p-[30px] w-[320px] shadow-2xl rounded-md border-t-[6px] border-purple-950">
        <Link to="/" className="self-center mb-3">
          <img src={logo} className="w-[170px] h-[30px]" />
        </Link>
        <div className="relative flex flex-col items-center mb-4">
          <h1 className="text-[30px] font-medium mb-[0px]">Login</h1>
          <div className="absolute bottom-0 left-20 ml-[11px] h-[4px] w-[25px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <Label className="text-[15px]" value="Your email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-[15px]" value="Your password" />
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            className="rounded-[3px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't Have an account?</span>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
        {errorMessage ? (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Login;
