import React from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import { CiCalendar } from "react-icons/ci";
import { BsQrCodeScan } from "react-icons/bs";
import mockData from "../../mockData";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <div className="flex flex-col flex-1 ml-[180px]">
        <Navbar heading={`Dashboard`}/>

        <div className="flex-1 mt-10 p-5 bg-gray-100 overflow-y-auto">
          {/* Stats */}

          <div className="flex gap-4 mb-2">
            <div className="bg-white rounded-lg shadow-sm w-1/3 p-3 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
                  <CiCalendar className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Active Invites</p>

                  <p className="font-bold text-sm">
                    {mockData.activeInvitations.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm w-1/3 p-3 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
                  <CiCalendar className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Expected Today</p>

                  <p className="font-bold text-sm">04</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm w-1/3 p-3 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
                  <CiCalendar className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Entries Today</p>

                  <p className="font-bold text-sm">08</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Access + Active Invitations */}

          <div className="flex gap-2 mb-4 h-48">
            {/* Secure Access */}

            <div className="bg-[#1a2b3c] text-white w-1/3 p-6 rounded-xl shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg">Secure Access</h2>

                <p className="text-sm text-slate-300 mt-2">
                  Instantly generate a secure QR code for expected guests and
                  visitors.
                </p>
              </div>

              <button className="flex items-center gap-2 bg-green-400 hover:bg-green-500 rounded-lg px-4 py-2.5 text-sm text-black font-medium w-fit cursor-pointer">
                <BsQrCodeScan />
                <Link to="/resident/invite-guest">
                Invite New Guest
                </Link>
              </button>
            </div>

            {/* Active Invitations */}

            <div className="bg-white w-2/3 p-4 rounded-xl shadow-lg">
              <div className="flex justify-between mb-3">
                <h2 className="font-semibold text-base">Active Invitations</h2>

                <button className="text-[11px] text-blue-600">View all</button>
              </div>

              {mockData.activeInvitations.slice(0, 2).map((invite) => (
                <div
                  key={invite.id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-2">
                    {/* Status dot */}

                    <div
                      className={`h-2 w-2 rounded-full
                      ${
                        invite.status === "Approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>

                    <div>
                      <p className="font-medium text-xs">{invite.guestName}</p>

                      <p className="text-[10px] text-gray-500">
                        {invite.expectedDate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-1 rounded-full
                    ${
                      invite.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {invite.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Entry History */}

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between mb-1">
              <h2 className="font-semibold text-base">Recent Entry History</h2>

              <button className="text-[11px] text-blue-600">
                View Full Log
              </button>
            </div>

            {mockData.history.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center gap-2">
                  {/* Dot */}

                  <div
                    className={`h-2 w-2 rounded-full
                    ${
                      entry.status === "Completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>

                  <div>
                    <p className="font-medium text-xs">{entry.guestName}</p>

                    <p className="text-[10px] text-gray-500">
                      {entry.visitDate}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px]">{entry.entryTime || "No Entry"}</p>

                  <span
                    className={`text-[10px]
                    ${
                      entry.status === "Completed"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
