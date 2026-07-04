import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ViewQR from "../../components/ViewQR";
import API from "../../api";
import {toast} from "react-toastify";

const InviteGuest = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedGuest, setGeneratedGuest] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [guestData, setGuestData] = useState({
    guestName: "",
    phone: "",
    visitDate: "",
    visitTime: "",
    purpose: "",
  });

  const createGuestInvitation = async () => {
  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      residentId: user._id,
      ...guestData,
    };

    const res = await API.post(
      "/api/guests/create",
      payload
    );

    if (res.data.success) {
      setGeneratedGuest(res.data.guest);
      toast.success("Guest invitation created successfully");
      setShowQR(true);
    }
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    toast.error(error.response?.data?.message || "Failed to create guest invitation");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex flex-col flex-1 ml-[180px]">
        <Navbar heading="Invite Guest" />
      </div>

      <Sidebar />

      {/* SHOW QR COMPONENT */}
      {showQR ? (
        <ViewQR
  guestData={generatedGuest}
  setShowQR={setShowQR}
  setStep={setStep}
  setGuestData={setGuestData}
/>
      ) : (
        <>
          {/* PROGRESS BAR */}
          <div className="max-w-2xl mx-auto mb-10 mt-20">
            <div className="flex items-center justify-between">

              {/* STEP 1 */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center
                  ${
                    step >= 1
                      ? "bg-green-700 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  1
                </div>

                <p className="text-xs mt-2">
                  Guest Details
                </p>
              </div>

              <div className="flex-1 h-[2px] bg-gray-300"></div>

              {/* STEP 2 */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center
                  ${
                    step >= 2
                      ? "bg-green-700 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  2
                </div>

                <p className="text-xs mt-2">
                  Visit Info
                </p>
              </div>

              <div className="flex-1 h-[2px] bg-gray-300"></div>

              {/* STEP 3 */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center
                  ${
                    step >= 3
                      ? "bg-green-700 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  3
                </div>

                <p className="text-xs mt-2">
                  Review
                </p>
              </div>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="w-[440px] mx-auto mb-4 mt-5 bg-gray-100 rounded-2xl p-8 flex flex-col">

              <h2 className="text-lg font-bold mb-1">
                Who's Coming
              </h2>

              <p className="text-gray-600 mb-4">
                Enter visitor details.
              </p>

              <p className="text-sm font-semibold">
                GUEST NAME
              </p>

              <input
                type="text"
                name="name"
                value={guestData.name}
                onChange={handleChange}
                placeholder="Name"
                className="bg-white mt-1 mb-3 border border-gray-300 rounded-lg p-2"
              />

              <p className="text-sm font-semibold">
                PHONE NUMBER
              </p>

              <input
                type="text"
                name="phone"
                value={guestData.phone}
                onChange={handleChange}
                placeholder="(+91) XXXXXXXXXX"
                className="bg-white mt-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="w-[440px] mx-auto mb-4 mt-5 bg-gray-100 rounded-2xl p-8 flex flex-col">

              <h2 className="text-lg font-bold mb-1">
                Visit Details
              </h2>

              <p className="text-gray-600 mb-4">
                Enter visit details.
              </p>

              <p className="text-sm font-semibold">
                VISIT DATE
              </p>

              <input
                type="date"
                name="visitDate"
                value={guestData.visitDate}
                onChange={handleChange}
                className="bg-white mt-1 mb-3 border border-gray-300 rounded-lg p-2"
              />

              <p className="text-sm font-semibold">
                VISIT TIME
              </p>

              <input
                type="time"
                name="visitTime"
                value={guestData.visitTime}
                onChange={handleChange}
                className="bg-white mt-1 mb-3 border border-gray-300 rounded-lg p-2"
              />

              <p className="text-sm font-semibold">
                PURPOSE OF VISIT
              </p>

              <input
                type="text"
                name="purpose"
                value={guestData.purpose}
                onChange={handleChange}
                placeholder="Meeting / Delivery"
                className="bg-white mt-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="w-[440px] mx-auto mb-4 mt-5 bg-gray-100 rounded-2xl p-8">

              <h2 className="text-lg font-bold mb-4">
                Review Details
              </h2>

              <div className="space-y-3">

                <p>
                  <span className="font-semibold">
                    Name:
                  </span>{" "}
                  {guestData.name}
                </p>

                <p>
                  <span className="font-semibold">
                    Phone:
                  </span>{" "}
                  {guestData.phone}
                </p>

                <p>
                  <span className="font-semibold">
                    Date:
                  </span>{" "}
                  {guestData.visitDate}
                </p>

                <p>
                  <span className="font-semibold">
                    Time:
                  </span>{" "}
                  {guestData.visitTime}
                </p>

                <p>
                  <span className="font-semibold">
                    Purpose:
                  </span>{" "}
                  {guestData.purpose}
                </p>
              </div>
            </div>
          )}

          {/* CONTINUE BUTTON */}
          {step < 3 && (
            <div
              onClick={() => setStep(step + 1)}
              className="group w-[440px] mx-auto mt-4 bg-[#1a2b3c] rounded-lg p-3 text-center hover:bg-white cursor-pointer border-2 border-gray-300"
            >
              <button className="text-white group-hover:text-[#1a2b3c]">
                Continue
              </button>
            </div>
          )}

          {/* GENERATE QR BUTTON */}
          {step === 3 && (
            <div
              onClick={createGuestInvitation}
              className="group w-[440px] mx-auto mt-4 bg-[#1a2b3c] rounded-lg p-3 text-center hover:bg-white cursor-pointer border-2 border-gray-300"
            >
              <button className="text-white group-hover:text-[#1a2b3c]">
  {loading ? "Generating..." : "Generate QR"}
</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InviteGuest;