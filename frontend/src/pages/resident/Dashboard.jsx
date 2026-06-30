import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import { CiCalendar } from "react-icons/ci";
import { BsQrCodeScan } from "react-icons/bs";
import { Link } from "react-router-dom";
import API from "../../api";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    activeInvitations: 0,
    expectedToday: 0,
    entriesToday: 0,
    activeGuestList: [],
  });

  const [recentGuest, setRecent] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const residentId = user?._id;

  const getDashboard = async () => {
    try {
      const res = await API.get(
        `/api/residents/dashboard/${residentId}`
      );

      setDashboard(res.data.dashboard);
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error.response?.data || error.message
      );
    }
  };

  const fetchRecentEntries = async () => {
    try {
      const res = await API.get(
        `/api/guests/resident/${residentId}`,
        {
          params: {
            limit: 5,
          },
        }
      );

      setRecent(res.data.guests || res.data || []);
    } catch (error) {
      console.error(
        "Recent Entries Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (residentId) {
      getDashboard();
      fetchRecentEntries();
    }
  }, [residentId]);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <div className="flex flex-col flex-1 ml-[180px]">
        <Navbar heading="Dashboard" />

        <div className="flex-1 mt-10 p-5 bg-gray-100 overflow-y-auto">

          {/* Stats */}

          <div className="flex gap-4 mb-2">
            <div className="bg-white rounded-lg shadow-sm w-1/3 p-3 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
                  <CiCalendar className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">
                    Active Invites
                  </p>
                  <p className="font-bold text-sm">
                    {dashboard.activeInvitations}
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
                  <p className="text-[11px] text-gray-500">
                    Expected Today
                  </p>
                  <p className="font-bold text-sm">
                    {dashboard.expectedToday}
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
                  <p className="text-[11px] text-gray-500">
                    Entries Today
                  </p>
                  <p className="font-bold text-sm">
                    {dashboard.entriesToday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Access + Active Invitations */}

          <div className="flex gap-2 mb-4 h-48">
            <div className="bg-[#1a2b3c] text-white w-1/3 p-6 rounded-xl shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg">
                  Secure Access
                </h2>

                <p className="text-sm text-slate-300 mt-2">
                  Instantly generate a secure QR code for expected
                  guests and visitors.
                </p>
              </div>

              <button className="flex items-center gap-2 bg-green-400 hover:bg-green-500 rounded-lg px-4 py-2.5 text-sm text-black font-medium w-fit">
                <BsQrCodeScan />
                <Link to="/resident/invite-guest">
                  Invite New Guest
                </Link>
              </button>
            </div>

            <div className="bg-white w-2/3 p-4 rounded-xl shadow-lg">
              <div className="flex justify-between mb-3">
                <h2 className="font-semibold text-base">
                  Active Invitations
                </h2>

                <button className="text-[11px] text-blue-600">
                  View all
                </button>
              </div>

              {dashboard.activeGuestList?.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">
                  No Active Invitations
                </p>
              ) : (
                dashboard.activeGuestList
                  ?.slice(0, 2)
                  .map((invite) => (
                    <div
                      key={invite._id}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            invite.status === "Approved"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />

                        <div>
                          <p className="font-medium text-xs">
                            {invite.name}
                          </p>

                          <p className="text-[10px] text-gray-500">
                            {new Date(
                              invite.visitDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-1 rounded-full ${
                          invite.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {invite.status}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Recent Entry History */}

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between mb-1">
              <h2 className="font-semibold text-base">
                Recent Entry History
              </h2>

              <button className="text-[11px] text-blue-600">
                View Full Log
              </button>
            </div>

            {recentGuest.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">
                No recent entries found
              </p>
            ) : (
              recentGuest.map((entry) => (
                <div
                  key={entry._id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        entry.status === "Completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    <div>
                      <p className="font-medium text-xs">
                        {entry.name}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        {new Date(
                          entry.visitDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px]">
                      {entry.visitTime || "No Entry"}
                    </p>

                    <span
                      className={`text-[10px] ${
                        entry.status === "Completed"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;