import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { FiDownload, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ViewQR = ({
  guestData,
  setShowQR,
  setStep,
  setGuestData,
}) => {
   
  const navigate=useNavigate();
  const qrData = JSON.stringify({
    name: guestData.guestName,
    phone: guestData.phone,
    date: guestData.visitDate,
    time: guestData.visitTime,
    purpose: guestData.purpose,
  });

  return (

    <div className="
    ml-[180px]
    mt-10
    bg-gray-100
    p-8
    ">


      {/* Success Header */}

      <div className="flex flex-col items-center">

        <div className="
        h-10
        w-10
        rounded-full
        bg-green-100
        flex
        items-center
        justify-center
        mb-2
        ">

          <FaCheck className="text-green-700 text-xl" />

        </div>



        <h1 className="text-3xl font-bold">

          Invitation Created Successfully

        </h1>


        <p className="text-gray-500 mt-2">

          Your guest invitation is active and ready for use.

        </p>

      </div>




      {/* Main Section */}

      <div className="
      max-w-4xl
      mx-auto
      mt-4
      flex
      gap-6
      ">


        {/* QR CARD */}

        <div className="
        bg-white
        rounded-2xl
        shadow-sm
        p-8
        w-[45%]
        flex
        flex-col
        items-center
        ">


          <div className="
          border-2
          border-green-600
          rounded-xl
          p-6
          ">

            <QRCodeCanvas
              value={qrData}
              size={180}
            />

          </div>



          <p className="
          text-xs
          text-gray-500
          mt-5
          ">

            ACCESS CODE

          </p>


          <h2 className="
          text-2xl
          font-bold
          tracking-widest
          mt-1
          ">

            GK-8821-XP

          </h2>

        </div>





        {/* DETAILS + BUTTONS */}

        <div className="w-[55%]">

          <div className="
          bg-white
          rounded-2xl
          shadow-sm
          p-6
          ">

            <h2 className="
            font-semibold
            text-lg
            mb-5
            ">

              Guest Details

            </h2>



            <div className="space-y-5">


              <div className="flex justify-between">

                <p className="text-gray-500">
                  Full Name
                </p>

                <p className="font-medium">
                  {guestData.guestName}
                </p>

              </div>



              <div className="flex justify-between">

                <p className="text-gray-500">
                  Visit Date
                </p>

                <p className="font-medium">
                  {guestData.visitDate}
                </p>

              </div>



              <div className="flex justify-between">

                <p className="text-gray-500">
                  Visit Time
                </p>

                <p className="font-medium">
                  {guestData.visitTime}
                </p>

              </div>



              <div className="flex justify-between">

                <p className="text-gray-500">
                  Purpose
                </p>

                <p className="font-medium">
                  {guestData.purpose}
                </p>

              </div>

            </div>

          </div>





          {/* ACTION BUTTONS */}

          <div className="mt-4 space-y-3">

            <button className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            p-3
            rounded-xl
            flex
            justify-center
            items-center
            gap-2
            ">

              <FaWhatsapp />

              Share via WhatsApp

            </button>



            <div className="flex gap-3">

              <button className="
              w-1/2
              border
              p-3
              rounded-xl
              flex
              justify-center
              items-center
              gap-2
              hover:bg-gray-50
              ">

                <FiDownload />

                Download PDF

              </button>



              <button
                onClick={() => { 
  setShowQR(false); 
  setStep(1); 
  setGuestData({ guestName: "", phone: "", visitDate: "", visitTime: "", purpose: "" }); 
  navigate("/resident/dashboard"); 
}}


                className="
                w-1/2
                bg-[#001B3A]
                text-white
                p-3
                rounded-xl
                flex
                justify-center
                items-center
                gap-2
                cursor-pointer
                "
              >

                <FiHome />

                Dashboard

              </button>

            </div>

          </div>

        </div>

      </div>




      {/* INFO NOTE */}

      <div className="
      max-w-3xl
      mx-auto
      mt-2
      bg-blue-50
      text-blue-800
      p-4
      rounded-xl
      text-sm
      ">

        Please ask your guest to present this QR code
        at the main security gate.

      </div>

    </div>

  );
};

export default ViewQR;