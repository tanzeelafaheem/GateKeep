import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  FaRegUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
  FaPhone,
  FaHome,
  FaClock,
  FaQrcode,
} from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import backgroundImage from '../../assets/scan.png'

const statusConfig = {
  PENDING: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Pending Approval",
  },
  ENTERED: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Entered",
  },
  EXPIRED: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Expired",
  },
  COMPLETED: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Completed",
  },
  REJECTED: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Rejected",
  },
};

export default function GuardScanPage() {
  const { state } = useLocation();

const guest = state?.guest;

if (!guest) {
  return (
    <h2
      style={{
        textAlign: "center",
        marginTop: 80,
      }}
    >
      No Guest Data Found
    </h2>
  );
}
const qrData = JSON.stringify({guest});
  console.log(guest.status);
  const currentStatus = statusConfig[(guest.status).toUpperCase()];
  //console.log(statusConfig[guest.status]);
  //console.log(currentStatus)

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* NAVBAR */}
      {/* <div className="bg-white border-b sticky top-0 z-20">
        <div className="flex justify-between items-center px-6 py-2">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Main North Gate
            </h1>
            <p className="text-xs tracking-wider text-gray-500">
              GATEKEEP SECURITY SYSTEM
            </p>
          </div>

          <FaRegUserCircle
            size={34}
            className="text-slate-700"
          />
        </div>
      </div> */}

      {/* PAGE */}
      <div className="max-w-6xl mx-auto p-5">
        {/* STATUS BAR */}
        <div
          className={`${currentStatus.bg} rounded-2xl p-4 mb-5 flex justify-between items-center`}
        >
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Current Status
            </p>

            <h2
              className={`text-2xl font-bold ${currentStatus.text}`}
            >
              {currentStatus.label}
            </h2>
          </div>

          <div
            className={`px-4 py-2 rounded-full font-medium ${currentStatus.text} bg-white`}
          >
            Live Verification
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">
            {/* GUEST CARD */}
            <div className="bg-gray-200 opacity-85 rounded-3xl shadow-sm p-6">
              <div className="flex gap-4">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt=""
                  className="w-20 h-20 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {guest.name}
                  </h2>

                  <p className="text-gray-800 text-sm mt-1">
                    Guest ID : {guest.guestId}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Destination
                      </p>

                      <p className="font-semibold">
                        {guest.destination}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Visit Type
                      </p>

                      <p className="font-semibold">
                        {guest.visitType}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Valid Till
                      </p>

                      <p className="font-semibold">
                        {guest.validTill}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Entry Time
                      </p>

                      <p className="font-semibold">
                        {guest.entryTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RESIDENT */}
            <div className="bg-white rounded-3xl opacity-80 shadow-sm p-5">
              <h3 className="font-semibold mb-4">
                Resident Information
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold">
                    SK
                  </div>

                  <div>
                    <p className="font-semibold">
                      {guest.residentName}
                    </p>

                    <p className="text-sm text-gray-700">
                      Host • Apt 102
                    </p>
                  </div>
                </div>

                <button className="border p-3 rounded-xl hover:bg-gray-50">
                  <FaPhone />
                </button>
              </div>
            </div>

            {/* ACTIVITY */}
            <div className="bg-white rounded-3xl opacity-80 shadow-sm p-5">
              <h3 className="font-semibold mb-5">
                Activity Timeline
              </h3>

              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-4">
                  <p className="font-medium">
                    Pass Generated
                  </p>

                  <p className="text-xs text-gray-500">
                    Today • 2:00 PM
                  </p>
                </div>

                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="font-medium">
                    QR Verified
                  </p>

                  <p className="text-xs text-gray-500">
                    Gate Scanner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {/* QR */}
            <div className="bg-white rounded-3xl opacity-90 shadow-sm p-6">
              <div className="flex justify-center">
                <div className="w-52 h-52 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <QRCodeCanvas
              value={qrData}
              size={180}
            />
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Scan for verification
              </p>
            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-3xl opacity-80 shadow-sm p-5">
              <h3 className="font-semibold mb-4">
                Available Actions
              </h3>

              {/* Pending */}
              {guest.status === "PENDING" && (
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-green-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2">
                    <FaCheckCircle />
                    Accept
                  </button>

                  <button className="bg-red-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2">
                    <FaTimesCircle />
                    Reject
                  </button>
                </div>
              )}

              {/* Entered */}
              {guest.status === "ENTERED" && (
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3">
                  <FaSignOutAlt />
                  Complete Visit
                </button>
              )}

              {/* Expired */}
              {guest.status === "EXPIRED" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="font-semibold text-red-600">
                    Pass Expired
                  </p>
                </div>
              )}

              {/* Completed */}
              {guest.status === "COMPLETED" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="font-semibold text-green-600">
                    Visit Completed
                  </p>
                </div>
              )}

              {/* Rejected */}
              {guest.status === "REJECTED" && (
                <div className="bg-gray-50 border rounded-xl p-4 text-center">
                  <p className="font-semibold text-gray-600">
                    Visit Rejected
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}