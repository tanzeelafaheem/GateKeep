import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import mockData from "../../mockData";
import { CiCalendar } from "react-icons/ci";

const History = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-[180px]">
        <Navbar heading="Guest Entry History" />

        <div className="flex-1 mt-10 p-5 bg-gray-100 overflow-y-auto">

          {/* Filters */}
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

          {/* Stats */}

          <div className="grid grid-cols-4 gap-4 mb-5">

            <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">
                Weekly Traffic
              </p>

              <h2 className="text-3xl font-bold mt-2">
                128 Entries
              </h2>

              <p className="text-green-600 text-sm mt-1">
                +12% from last week
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">
                Scheduled Today
              </p>

              <h2 className="text-2xl font-bold mt-2">
                8 Guests
              </h2>
            </div>

            <div className="bg-[#1a2b3c] text-white rounded-xl p-5 shadow-sm">
              <p className="text-xs opacity-70">
                Security Status
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Active
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>

                <p className="text-xs">
                  All gates operational
                </p>
              </div>
            </div>

          </div>

          {/* Table */}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50 text-left">

                <tr className="text-xs text-gray-500">

                  <th className="px-6 py-4">
                    Guest
                  </th>

                  <th className="px-6 py-4">
                    Date & Time
                  </th>

                  <th className="px-6 py-4">
                    Purpose
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {mockData.history.map((entry) => (

                  <tr
                    key={entry.id}
                    className=" text-sm hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <div>
                        <p className="font-medium">
                          {entry.guestName}
                        </p>

                        <p className="text-xs text-gray-500">
                          {entry.phone}
                        </p>
                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {entry.visitDate}
                    </td>

                    <td className="px-6 py-4">
                      {entry.purpose}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs
                        ${
                          entry.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {entry.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* Pagination */}

            <div className="flex justify-between items-center p-4 border-t border-gray-400">

              <p className="text-xs text-gray-500">
                Showing 1-10 entries
              </p>

              <div className="flex gap-2">

                <button className="border px-3 py-1 rounded">
                  Prev
                </button>

                <button className="bg-[#1a2b3c] text-white px-3 py-1 rounded">
                  1
                </button>

                <button className="border px-3 py-1 rounded">
                  2
                </button>

                <button className="border px-3 py-1 rounded">
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default History;