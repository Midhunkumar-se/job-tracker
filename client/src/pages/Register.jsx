import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import logo from "../assets/logo.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(to_bottom_left,#ffffff,#e1d5e0)] h-lvh pt-[80px] flex flex-col  items-center">
      <div className="bg-[linear-gradient(to_bottom_left,#ffffff,#F6E8FF)] flex flex-col justify-center p-[30px] w-[320px] shadow-2xl rounded-md border-t-[6px] border-purple-950">
        <Link to="/" className="self-center mb-3">
          <img src={logo} className="w-[170px] h-[30px]" />
        </Link>
        <div className="relative flex flex-col items-center mb-4">
          <h1 className="text-[30px] font-medium mb-[0px]">Register</h1>
          <div className="absolute bottom-0 left-10 ml-[30px] h-[4px] w-[30px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <Label className="text-[15px]" value="Your username" />
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>
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
            className="rounded-md"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Register;
