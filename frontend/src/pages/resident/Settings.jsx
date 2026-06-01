import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Settings = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-[180px]">
        <Navbar heading="Settings" />

        <div className="flex-1 mt-10 p-5 bg-gray-100 overflow-y-auto">

          {/* Top Section */}

          <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Profile Card */}

            <div className="col-span-2 bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">

              <img
                src=""
                alt="Profile"
                className="w-18 h-18 rounded-full border-2 border-gray-200"
              />

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Johnathan Doe
                </h2>

                <p className="text-sm text-gray-500">
                  Resident of Skyline Heights, Apt 1402
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

              <p className="text-xs text-gray-300">
                Role:
              </p>

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
                    defaultValue="Johnathan Doe"
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    defaultValue="johnathan@example.com"
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    PHONE NUMBER
                  </label>

                  <input
                    type="text"
                    defaultValue="+91 9876543210"
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                  />
                </div>

              </div>
            </div>

            {/* Notifications */}

            <div className="bg-white rounded-xl shadow-sm p-5">

              <h2 className="text-2xl font-semibold mb-5">
                Notification Preferences
              </h2>

              <div className="space-y-6">

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-medium">
                      Guest Arrivals
                    </h3>

                    <p className="text-sm text-gray-500">
                      Push notification when guest scans QR
                    </p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-medium">
                      Maintenance Updates
                    </h3>

                    <p className="text-sm text-gray-500">
                      Alerts for scheduled repairs
                    </p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-medium">
                      Community Broadcasts
                    </h3>

                    <p className="text-sm text-gray-500">
                      Building announcements and events
                    </p>
                  </div>

                  <input type="checkbox" />
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
                    BUILDING
                  </label>

                  <input
                    type="text"
                    value="Skyline Heights"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    APARTMENT
                  </label>

                  <input
                    type="text"
                    value="1402"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-50"
                  />
                </div>

              </div>
            </div>

            {/* Security Settings */}

            <div className="bg-white rounded-xl shadow-sm p-5">

              <h2 className="text-2xl font-semibold mb-5">
                Security Settings
              </h2>

              <div className="space-y-3">

                <button className="w-full border border-gray-300 rounded-lg p-3 text-left hover:bg-gray-50">
                  Change Password
                </button>

                <button className="w-full border border-gray-300 rounded-lg p-3 text-left hover:bg-gray-50">
                  Biometric Authentication
                </button>

                <button className="w-full border border-red-200 text-red-600 rounded-lg p-3 text-left hover:bg-red-50">
                  Sign Out from All Devices
                </button>

              </div>
            </div>

          </div>

          {/* Bottom Buttons */}

          <div className="flex justify-end gap-4 mt-6">

            <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Discard Changes
            </button>

            <button className="px-5 py-2 bg-[#1a2b3c] text-white rounded-lg hover:bg-[#24384d]">
              Save Changes
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;