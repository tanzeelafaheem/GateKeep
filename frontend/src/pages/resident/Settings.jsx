import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import API from "../../api";
import {toast} from "react-toastify";
import image from "../../assets/people-avatar.jpeg";
import { FaHouseUser } from "react-icons/fa";

const Settings = () => {
   const residentId = JSON.parse(localStorage.getItem("user"))?._id;

    const [resident, setResident] = useState({
    name: residentId.name,
    email: residentId.email,
    phone: residentId.phone,
    flatNo: residentId.flatNo,
    password: residentId.password,
  });

  const [isEditing, setIsEditing] = useState(false);
  const fetchProfile = async () => {
    try {
      const res = await API.get(`/api/residents/profile/${residentId}`);

      setResident(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveProfile = async () => {
    try {
      await API.post(`/api/residents/edit-profile/${residentId}`, {
        name: resident.name,
        email: resident.email,
        phone: resident.phone,
      });

      toast.success("Profile Updated Successfully");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (residentId) {
      fetchProfile();
    }
  }, [residentId]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-45">
        <Navbar heading="Settings" />

        <div className="flex-1 mt-10 p-5 bg-gray-100 overflow-y-auto">
          {/* Top Section */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Profile Card */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
              <div 
                className="h-18 w-18 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center ">
                <FaHouseUser className="h-14 w-14 text-[#243b52]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {resident.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Apartment {resident.flatNo}
                </p>

                <p className="text-sm text-gray-500">
                  Resident of Skyline Heights
                </p>

                <div className="flex gap-2 mt-3">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    Primary Resident
                  </span>

                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    Gold Status
                  </span>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-[#1a2b3c] text-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-300">Role:</p>

              <h2 className="text-3xl font-bold mt-3">
                Resident
              </h2>

              <p className="text-sm text-gray-300 mt-3">
                You are logged in with resident privileges.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-300 mb-6 text-sm">
            <p className="pb-3 border-b-2 border-[#1a2b3c] font-semibold">
              Profile Information
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-2 gap-5">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-2xl font-semibold mb-5">
                Contact Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    FULL NAME
                  </label>

                  <input
                    type="text"
                    value={resident.name}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    value={resident.email}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    PHONE NUMBER
                  </label>

                  <input
                    type="text"
                    value={resident.phone}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Residency Information */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-2xl font-semibold mb-5">
                Residency Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    APARTMENT
                  </label>

                  <input
                    type="text"
                    value={resident.flatNo}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                  <label className="text-xs font-semibold text-gray-500">
                    PASSWORD
                  </label>

                  <input
                    type="password"
                    value={resident.password}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-[#1a2b3c] text-white rounded-lg hover:bg-[#24384d]"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-150 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">
                Edit Profile
              </h2>

              <button
                onClick={() => setIsEditing(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  FULL NAME
                </label>

                <input
                  type="text"
                  value={resident.name}
                  onChange={(e) =>
                    setResident({
                      ...resident,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  value={resident.email}
                  onChange={(e) =>
                    setResident({
                      ...resident,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  PHONE NUMBER
                </label>

                <input
                  type="text"
                  value={resident.phone}
                  onChange={(e) =>
                    setResident({
                      ...resident,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Password
                </label>

                <input
                  type="password"
                  value={resident.password}
                  onChange={(e) =>
                    setResident({
                      ...resident,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  fetchProfile();
                  setIsEditing(false);
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="px-5 py-2 bg-[#1a2b3c] text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;