import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

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
    </>
  );
};

export default InviteGuest;
