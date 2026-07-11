import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../api"

import login from "../assets/login.jpeg";

import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { FiAtSign, FiLock, FiEye, FiEyeOff,FiInfo } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Resident");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async () => {
    try {
      setLoading(true);

      let endpoint = "";
      if (role === "Resident") {
        endpoint = "/api/residents/login";
      } else if (role === "Guard") {
        endpoint = "/api/guards/login";
      } else if (role === "Admin") {
        endpoint = "/api/admin/login";
      }

      const payload = {};
      if (role === "Guard") {
        payload.employeeId = formData.emailOrPhone; 
      } else {
        payload.email = formData.emailOrPhone;
      }
      payload.password = formData.password;

      const response = await API.post(endpoint, payload);
      const data = response.data;
      console.log(data);

     localStorage.setItem("role", response.data.role);  
     localStorage.setItem("user",JSON.stringify(response.data.user));


      toast.success("Login Successful");

      if (role === "Resident") {
        navigate("/resident/dashboard");
      } else if (role === "Guard") {
        localStorage.setItem("guard", JSON.stringify(data.guard));
        console.log("Guard data stored in localStorage:", data.guard);
        navigate("/guard/qr-scan");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };
  const fillDemoCredentials = () => {
  if (role === "Resident") {
    setFormData({
      emailOrPhone: "tanzeela@gatekeep.com",
      password: "mypass@123",
    });
  }

  if (role === "Guard") {
    setFormData({
      emailOrPhone: "SO01NG",
      password: "guard1",
    });
  }

  if (role === "Admin") {
    setFormData({
      emailOrPhone: "",
      password: "",
    });
  }
};


  return (
   <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 lg:bg-transparent">
  {/* Left Side (Hidden on mobile/tablet, visible on desktop) */}
  <div className="hidden lg:block lg:w-[60%] relative">
    <img
      src={login}
      alt="login"
      className="w-full h-screen object-cover"
    />

    <div className="absolute inset-0 bg-black/55"></div>

    <div className="absolute bottom-10 left-10 text-white pr-10">
      <h1 className="text-4xl font-bold leading-tight">
        Secure Seamless
        <br />
        Sophisticated.
      </h1>

      <p className="text-gray-300 mt-4 max-w-md">
        Experience the gold standard in community
        management and security automation
      </p>

      <div className="flex flex-wrap gap-6 mt-8">
        <div className="flex items-center gap-2">
          <BsShieldCheck size={20} />
          <span>Verified Entry</span>
        </div>

        <div className="flex items-center gap-2">
          <AiOutlineStock size={20} />
          <span>24/7 Monitoring</span>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side (Full width on mobile, 40% on desktop) */}
  <div className="w-full lg:w-[40%] bg-gray-100 flex justify-center items-center p-4 min-h-screen lg:min-h-0">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-10 w-10 bg-green-100 rounded-lg flex justify-center items-center">
          <BsShieldCheck
            className="text-green-600"
            size={20}
          />
        </div>

        <h2 className="text-2xl font-bold text-[#1a2b3c]">
          GateKeep
        </h2>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Welcome Back!
      </h1>

      <p className="text-gray-500 mt-2 mb-6 text-center text-sm sm:text-base">
        Please enter your details.
      </p>

      {/* Info Tooltip Component */}
      <div className="flex justify-center mb-5">
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
          >
            <FiInfo size={18} />
            <span className="text-sm">Project Info</span>
          </button>

          {/* Tooltip (Responsive Width & Safe Z-Index) */}
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[280px] sm:w-80 rounded-lg bg-gray-900 text-white text-xs sm:text-sm p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50">
            <p className="font-semibold mb-2">
              Demo Version
            </p>

            <p className="leading-relaxed text-gray-200">
              Account creation is restricted to the Society Admin.
              Reviewers can use the
              <span className="font-semibold text-blue-300">
                {" "}Use Demo Credentials{" "}
              </span>
              button below to automatically fill login credentials
              and explore the Resident, Security Officer, and Administrator modules.
            </p>

            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Role Switch (Overflow scrollable with hidden scrollbars on mobile) */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => setRole("Resident")}
          className={`cursor-pointer min-w-[90px] flex-1 py-2 rounded-md text-xs sm:text-sm font-medium transition ${
            role === "Resident"
              ? "bg-white shadow text-[#1a2b3c]"
              : "text-gray-500"
          }`}
        >
          Resident
        </button>

        <button
          onClick={() => setRole("Guard")}
          className={`cursor-pointer min-w-[110px] flex-1 py-2 rounded-md text-xs sm:text-sm font-medium transition ${
            role === "Guard"
              ? "bg-white shadow text-[#1a2b3c]"
              : "text-gray-500"
          }`}
        >
          Security Officer
        </button>

        <button
          onClick={() => setRole("Admin")}
          className={`cursor-pointer min-w-[100px] flex-1 py-2 rounded-md text-xs sm:text-sm font-medium transition ${
            role === "Admin"
              ? "bg-white shadow text-[#1a2b3c]"
              : "text-gray-500"
          }`}
        >
          Administrator
        </button>
      </div>

      {/* Email / Phone Form Field */}
      <div className="mb-4">
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-2 tracking-wider">
          {role === "Guard" ? "EMPLOYEE ID" : "EMAIL ADDRESS OR PHONE"}
        </p>

        <div className="border rounded-lg flex items-center px-3 bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
          <FiAtSign
            size={18}
            className="text-gray-400 shrink-0"
          />

          <input
            type="text"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            placeholder={role === "Guard" ? "e.g. Emp12345" : "name@society.com"}
            className="w-full p-2.5 sm:p-3 outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Password Form Field */}
      <div>
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-2 tracking-wider">
          PASSWORD
        </p>

        <div className="border rounded-lg flex items-center px-3 bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
          <FiLock
            size={18}
            className="text-gray-400 shrink-0"
          />

          <input
            type={show ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2.5 sm:p-3 outline-none text-sm sm:text-base"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="p-1"
          >
            {show ? (
              <FiEyeOff
                size={18}
                className="text-gray-400 cursor-pointer"
              />
            ) : (
              <FiEye
                size={18}
                className="text-gray-400 cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me / Forgot Pass */}
      <div className="flex justify-between items-center mt-3 text-xs sm:text-sm">
        <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
          Remember me
        </label>

        <button className="font-semibold text-[#1a2b3c] cursor-pointer hover:underline">
          Forgot password?
        </button>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="cursor-pointer w-full mt-6 bg-[#001529] text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-[#0d2238] active:scale-[0.99] transition disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In →"}
      </button>

      {/* Demo Action Button */}
      <button
        onClick={fillDemoCredentials}
        className="w-full mt-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl py-2.5 font-medium hover:bg-blue-100 active:scale-[0.99] transition cursor-pointer text-sm sm:text-base"
      >
        🧪 Use Demo Credentials
      </button>

      {/* Support Footer text */}
      <p className="text-center text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
        Don't have an account?{" "}
        <span className="font-semibold text-[#1a2b3c] hover:underline cursor-pointer block sm:inline">
          Contact your society admin.
        </span>
      </p>
    </div>
  </div>
</div>
  )
};

export default Login;