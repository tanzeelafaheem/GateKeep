import React from "react";

const ViewQR = ({ guestData, setShowQR, setStep, setGuestData }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-[400px]">

        <h1 className="text-2xl font-bold mb-4">
          Guest QR Code
        </h1>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=
          Name:${guestData.guestName},
          Phone:${guestData.phone},
          Date:${guestData.visitDate},
          Time:${guestData.visitTime},
          Purpose:${guestData.purpose}`}
          alt="QR Code"
          className="mx-auto"
        />

        <div className="mt-5 text-left space-y-2">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {guestData.guestName}
          </p>

          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {guestData.phone}
          </p>

          <p>
            <span className="font-semibold">Date:</span>{" "}
            {guestData.visitDate}
          </p>

          <p>
            <span className="font-semibold">Time:</span>{" "}
            {guestData.visitTime}
          </p>

          <p>
            <span className="font-semibold">Purpose:</span>{" "}
            {guestData.purpose}
          </p>
        </div>

        <button
          onClick={() => {
            setShowQR(false);
            setStep(1);

            setGuestData({
              guestName: "",
              phone: "",
              visitDate: "",
              visitTime: "",
              purpose: "",
            });
          }}
          className="mt-6 bg-[#1a2b3c] text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          Create Another Invite
        </button>
      </div>
    </div>
  );
};

export default ViewQR;