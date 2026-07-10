import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../../api";
import {toast} from "react-toastify"
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
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Pending Approval",
  },
  Entered: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Entered",
  },
  Expired: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Expired",
  },
  Completed: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Completed",
  },
  Rejected: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Rejected",
  },
};

export default function GuardScanPage() {
  const { state } = useLocation();

const [guest,setGuest] = useState(null);

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) || "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${last}`.toUpperCase();
};

const getGuest=async()=>{
  try {
    const res = await API.get(`/api/guests/${state.qrCode}`);
    setGuest(res.data.guest);
    //console.log("Guest Data:", res.data.guest.resident);
  }
  catch (error) {
    toast.error(
      error.response?.data || error.message
    );
  }
}


 useEffect(() => {
  if (state?.qrCode) {
    getGuest();
  }
}, []);

if (!guest) {
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white/80 px-8 py-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold">
          Loading Guest Details...
        </h2>
      </div>
    </div>
  );
}
const currentStatus =statusConfig[guest.status]

const approveGuest = async () => {
  try {
    const res = await API.patch(`/api/guests/approve/${guest._id}`);

    if (res.data.success) {
      setGuest(res.data.guest);
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data || error.message
    );
  }
};

const rejectGuest = async () => {
  try {
    const res = await API.patch(`/api/guests/reject/${guest._id}`);

    if (res.data.success) {
      setGuest(res.data.guest);
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data || error.message
    );
  }
};

const completeVisit = async () => {
  try {
    const res = await API.patch(`/api/guests/complete/${guest._id}`);

    if (res.data.success) {
      setGuest(res.data.guest);
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data || error.message
    );
  }
};

const deleteGuest = async () => {
  try {
    const res = await API.delete(`/api/guests/${guest._id}`);

    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data || error.message
    );
  }
};
const handleCall = () => {
  const phone=guest.resident.phone;
  window.location.href = `tel:${phone}`;
};

  return (
    
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      

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
                <div className="w-20 h-20 rounded-full bg-blue-300 flex items-center justify-center font-bold">
                    {getInitials(guest.name)}
                  </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {guest.name}
                  </h2>

                  <p className="text-gray-800 text-sm mt-1">
                    Guest ID : {guest.qrCode}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Destination
                      </p>

                      <p className="font-semibold">
                        {guest.resident.flatNo||"loading"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Visit Purpose
                      </p>

                      <p className="font-semibold">
                        {guest.purpose}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Valid Till
                      </p>

                      <p className="font-semibold">
                        {new Date(guest.visitDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-800 uppercase">
                        Visit Time
                      </p>

                      <p className="font-semibold">
                        {guest.visitTime}
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
                    {getInitials(guest.resident.name)}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {guest.resident.name}
                    </p>

                    <p className="text-sm text-gray-700">
                      Host • {guest.resident.flatNo}
                    </p>
                  </div>
                </div>

                <button className="border p-3 rounded-xl hover:bg-gray-50"
                onClick={handleCall}>
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
              value={guest.qrCode}
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
              {guest.status === "Pending" && (
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-green-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                  onClick={approveGuest}>
                    <FaCheckCircle />
                    Accept
                  </button>

                  <button className="bg-red-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                  onClick={rejectGuest}>
                    <FaTimesCircle />
                    Reject
                  </button>
                </div>
              )}

              {/* Entered */}
              {guest.status === "Entered" && (
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3"
                onClick={completeVisit}>
                  <FaSignOutAlt />
                  Complete Visit
                </button>
              )}

              {/* Expired */}
              {guest.status === "Expired" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
                onClick={deleteGuest}>
                  <p className="font-semibold text-red-600">
                    Pass Expired/Delete 
                  </p>
                </div>
              )}

              {/* Completed */}
              {guest.status === "Completed" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
                onClick={completeVisit}>
                  <p className="font-semibold text-green-600">
                    Visit Completed
                  </p>
                </div>
              )}

              {/* Rejected */}
              {guest.status === "Rejected" && (
                <div className="bg-gray-50 border rounded-xl p-4 text-center"
                onClick={rejectGuest}>
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