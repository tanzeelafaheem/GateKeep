import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";

const InviteGuest = () => {
  const [step, setstep] = useState(1);

  return (
    <>
      <div className="flex flex-col flex-1 ml-[180px]">
        <Navbar heading={`Invite Guest`} />
      </div>
      <Sidebar />
      {/*Progress bar*/}
      <div className="max-w-2xl mx-auto mb-10 mt-20 ml-180px">
        <div className="flex items-center justify-between">
          {/* Step 1 */}

          <div className="flex flex-col items-center">
            <div
              className={`
h-10
w-10
rounded-full
flex
items-center
justify-center

${step >= 1 ? "bg-green-700 text-white" : "bg-gray-300"}
`}
            >
              1
            </div>

            <p className="text-xs mt-2">Guest Details</p>
          </div>

          <div className="flex-1 h-[2px] bg-gray-300"></div>

          {/* Step 2 */}

          <div className="flex flex-col items-center">
            <div
              className={`
h-10
w-10
rounded-full
flex
items-center
justify-center

${step >= 2 ? "bg-green-700 text-white" : "bg-gray-300"}
`}
            >
              2
            </div>

            <p className="text-xs mt-2">Visit Info</p>
          </div>

          <div className="flex-1 h-[2px] bg-gray-300"></div>

          {/* Step 3 */}

          <div className="flex flex-col items-center">
            <div
              className={`
h-10
w-10
rounded-full
flex
items-center
justify-center

${step >= 3 ? "bg-green-700 text-white" : "bg-gray-300"}
`}
            >
              3
            </div>

            <p className="text-xs mt-2">Review</p>
          </div>
        </div>
      </div>
      {/*Step 1*/}
      {step === 1 && (
        <div className="w-110  mx-auto mb-4 mt-5 bg-gray-100 rounded-2xl p-8 flex flex-col">
          <h2 className="text-lg font-bold mb-1.5">Who's coming</h2>
          <p className="text-gray-600 mb-4">
            Enter the basic info of your visitor.
          </p>
          <p className="text-sm font-semibold">GUEST NAME</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="text" placeholder="Name" />
          <p className="text-sm font-semibold">PHONE NUMBER</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="text" placeholder="(+91) XXXXXXXXXX" />
        </div>
      )}
      {/*Step 2*/}
      {step === 2 && (
        <div className="w-110  mx-auto mb-4 mt-5 bg-gray-100 rounded-2xl p-8 flex flex-col">
          <h2 className="text-lg font-bold mb-1.5">Visit Details</h2>
          <p className="text-gray-600 mb-4">
            Enter the info below.
          </p>
          <p className="text-sm font-semibold">VISIT DATE</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="date" placeholder="Name" />
          <p className="text-sm font-semibold">VISIT TIME</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="text" placeholder="(+91) XXXXXXXXXX" />
          <p className="text-sm font-semibold">PURPOSE OF VISIT</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="text" placeholder="(+91) XXXXXXXXXX" />        
        </div>
      )}
      {step === 3 && (
        <div className="w-110  mx-auto mb-4 mt-5 bg-gray-100 rounded-2xl p-8 flex flex-col">
          <h2 className="text-lg font-bold mb-1.5">Review Details</h2>
          <p className="text-gray-600 mb-4">
            Enter the info below.
          </p>
          <p className="text-sm font-semibold">VISIT DATE</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="date" placeholder="Name" />
          <p className="text-sm font-semibold">VISIT TIME</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="text" placeholder="(+91) XXXXXXXXXX" />
          <p className="text-sm font-semibold">PURPOSE OF VISIT</p>
          <input className='bg-white mt-1 mb-2 border-1 border-gray-300'type="text" placeholder="(+91) XXXXXXXXXX" />        
        </div>
      )}
      {step<3&&(
      <div className="group w-110 mx-auto mt-4 bg-[#1a2b3c] rounded-lg p-2 text-center hover:bg-white cursor-pointer border-2 border-gray-300" onClick={() => setstep(step + 1)}>
  <button className="text-white group-hover:text-[#1a2b3c] cursor-pointer">Continue</button>
</div>
)}
{step==3&&(
  <div className="group w-110 mx-auto mt-4 bg-[#1a2b3c] rounded-lg p-2 text-center hover:bg-white cursor-pointer border-2 border-gray-300" onClick={() => setstep(step + 1)}>
  <Link to="/viewQR">
    <button className="text-white group-hover:text-[#1a2b3c] cursor-pointer">Generate QR</button>
  </Link>
</div>
)}
    </>
  );
};

export default InviteGuest;
