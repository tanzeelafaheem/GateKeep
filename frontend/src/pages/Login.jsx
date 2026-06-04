import React from 'react'
import login from '../assets/login.jpeg'
import { BsShieldCheck } from 'react-icons/bs';
import { AiOutlineStock } from "react-icons/ai";
import { useState } from 'react';
import { FiAtSign, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';


const Login = () => {
  const [role, setRole] = useState("Resident");
  const[show, setShow] = useState(false);

  return (
    <div className='flex  h-screen'>
      {/*left*/}
      <div className="w-[60%] relative">
        <img src={login} alt="" className='w-full h-screen object-cover' />
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Secure Seamless
          <br />
          Sophisticated.
          </h1>
          <p className="text-gray-300 mt-4">
            Experience the gold standard in community management and security automation
          </p>
          <div className="flex gap-6 mt-8">
            <div className="flex items-center gap-2">
              <BsShieldCheck/>
              <span>Verified Entry</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineStock/>
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>
      </div>
      {/*right*/}
      <div className="w-[40%] bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[420px] rounded-2xl shadow-lg p-8">

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-10 w-10 bg-green-100 rounded-lg flex justify-center items-center">
            <BsShieldCheck className="text-green-600" size={20} />
          </div>

          <h2 className="text-2xl font-bold text-[#1a2b3c]">
            GateKeep
          </h2>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Welcome Back!
        </h1>

        <p className="text-gray-500 mt-2 mb-6 text-center">
          Please enter your details.
        </p>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setRole("Resident")}
            className={`cursor-pointer flex-1 py-2 rounded-md text-sm font-medium ${
              role === "Resident"
                ? "bg-white shadow text-[#1a2b3c]"
                : "text-gray-500"
            }`}
          >
            Resident
          </button>

          <button
            onClick={() => setRole("Guard")}
            className={`cursor-pointer flex-1 py-2 rounded-md text-sm font-medium ${
              role === "Guard"
                ? "bg-white shadow text-[#1a2b3c]"
                : "text-gray-500"
            }`}
          >
            Guard
          </button>

          <button
            onClick={() => setRole("Admin")}
            className={`cursor-pointer flex-1 py-2 rounded-md text-sm font-medium ${
              role === "Admin"
                ? "bg-white shadow text-[#1a2b3c]"
                : "text-gray-500"
            }`}
          >
            Admin
          </button>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            EMAIL ADDRESS OR PHONE
          </p>

          <div className="border rounded-lg flex items-center px-3">
            <FiAtSign size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="name@society.com"
              className="w-full p-3 outline-none"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">
            PASSWORD
          </p>

          <div className="border rounded-lg flex items-center px-3">
            <FiLock size={18} className="text-gray-400" />

            <input
  type={show ? "text" : "password"} 
  placeholder="••••••••"
  className="w-full p-3 outline-none"
/>

           <button onClick={() => setShow(!show)}>
            <FiEye size={18} className="text-gray-400 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
            <input type="checkbox" />
            Remember me
          </label>

          <button className="font-semibold text-[#1a2b3c] cursor-pointer">
            Forgot password?
          </button>
        </div>

        <button className="cursor-pointer w-full mt-6 bg-[#001529] text-white py-3 rounded-xl font-semibold hover:bg-[#0d2238] transition">
          Sign In →
        </button>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{" "}
          <span className="font-semibold text-[#1a2b3c] hover:underline cursor-pointer">
            Contact your society admin.
          </span>
        </p>
      </div>
    </div>
      
    </div>
  )
}

export default Login
