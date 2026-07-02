import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { CiCalendar } from "react-icons/ci";
import API from "../../api";
import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dashboard, setDashboard] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const residentId = user?._id;

  // Modified to fetch and sync state safely
  const fetchHistory = async (pageNo = 1) => {
    if (!residentId) return;
    try {
      const res = await API.get(
        `/api/guests/resident/${residentId}?page=${pageNo}&limit=4`
      );

      setHistory(res.data.guests || []);
      setPage(res.data.currentPage || pageNo);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };
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
  useEffect(() => {
    fetchHistory(page);
    getDashboard();
  }, [residentId, page]);

  // Handlers that update page state safely
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-45">
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
                   {dashboard.activeInvitations || 0}
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
                  <p className="font-bold text-sm">{dashboard.expectedToday}</p>
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
                  <p className="font-bold text-sm">{dashboard.entriesToday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">Weekly Traffic</p>
              <h2 className="text-3xl font-bold mt-2">128 Entries</h2>
              <p className="text-green-600 text-sm mt-1">+12% from last week</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">Scheduled Today</p>
              <h2 className="text-2xl font-bold mt-2">8 Guests</h2>
            </div>

            <div className="bg-[#1a2b3c] text-white rounded-xl p-5 shadow-sm">
              <p className="text-xs opacity-70">Security Status</p>
              <h2 className="text-2xl font-bold mt-2">Active</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <p className="text-xs">All gates operational</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr className="text-xs text-gray-500">
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      No guest history to display
                    </td>
                  </tr>
                ) : (
                  history.map((entry) => (
                    <tr key={entry._id} className="text-sm hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-xs text-gray-500">{entry.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(entry.visitDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{entry.purpose}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            entry.status === "Approved"
                ? "bg-green-100 text-green-700"
                : entry.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : entry.status === "Completed"
                ? "bg-blue-100 text-blue-700"
                : entry.status === "Expired"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* FIXED PAGINATION SECTION */}
            <div className="flex justify-between items-center p-4 border-t border-gray-400">
              <p className="text-xs text-gray-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  className="border px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  disabled={page <= 1}
                  onClick={handlePrevPage}
                >
                  Prev
                </button>
                <button className="bg-[#1a2b3c] text-white px-3 py-1 rounded cursor-default select-none">
                  {page}
                </button>
                <button
                  className="border px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  disabled={page >= totalPages}
                  onClick={handleNextPage}
                >
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
