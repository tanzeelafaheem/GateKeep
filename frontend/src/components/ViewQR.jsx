import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaCheck } from "react-icons/fa";
import { FiDownload, FiHome,FiShare2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ViewQR = ({
  guestData,
  setShowQR,
  setStep,
  setGuestData,
}) => {

  const navigate = useNavigate();
  const qrRef = useRef(null);
  const accessCode = "GK-8821-XP";
  const printRef = useRef(null);
  const qrData = JSON.stringify({
    name: guestData.guestName,
    phone: guestData.phone,
    date: guestData.visitDate,
    time: guestData.visitTime,
    purpose: guestData.purpose,
  });
  // Construct the text message template
  const shareMessage = `Hello ${guestData.guestName},\n\nHere is your entry pass invitation.\n📅 Date: ${guestData.visitDate}\n🕒 Time: ${guestData.visitTime}\n🔑 Access Code: ${accessCode}\n\nPlease present the code/QR at the gate.`;

  // Function 1: Fixed WhatsApp Share URL
  const handleWhatsAppShare = () => {
    const encodedMessage = encodeURIComponent(shareMessage);

    // Clean structure to prevent logic leaking into the string text
    const phoneNum = guestData?.phone ? guestData.phone.replace(/\D/g, '') : "";
    const whatsappUrl = `https://wa.me{phoneNum}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  // Function 3: Fixed Download QR with safe string replacement
  // Function to download QR and Details section combined as a PDF
const handleDownloadPDF = () => {
  // 1. Target the actual canvas element rendering the QR code
  const canvas = printRef.current?.querySelector("canvas");
  if (!canvas) {
    alert("QR code element not found. Please try again.");
    return;
  }

  // 2. Convert live canvas drawing pixels into a static PNG data image string
  const qrImageSrc = canvas.toDataURL("image/png");

  // 3. Extract your current styles to ensure Tailwind visual cards look correct
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(style => style.outerHTML)
    .join('\n');

  // 4. Safely construct values to protect against null/undefined fields
  const guestName = guestData?.guestName || "N/A";
  const visitDate = guestData?.visitDate || "N/A";
  const visitTime = guestData?.visitTime || "N/A";
  const purpose = guestData?.purpose || "N/A";

  // 5. Open an isolated clean window sandbox
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Popup blocked! Please allow popups to save the invitation pass.");
    return;
  }

  // 6. Inject explicit template markup containing both the static image and fields text
  printWindow.document.write(`
    <html>
      <head>
        <title>Guest_Invitation_${guestName.replace(/\s+/g, "_")}</title>
        ${styles}
        <style>
          @media print {
            body { background: white; color: black; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { size: portrait; margin: 15mm; }
          }
        </style>
      </head>
      <body class="bg-white flex items-center justify-center min-h-screen p-6 font-sans">
        <div class="w-full max-w-2xl border-2 border-gray-200 rounded-3xl p-8 bg-white shadow-sm flex flex-col items-center">
          
          <!-- Header Banner -->
          <div class="text-center border-b border-gray-100 w-full pb-4 mb-6">
            <h1 class="text-2xl font-bold tracking-wide text-gray-800">GUEST INVITATION PASS</h1>
            <p class="text-sm text-gray-400 mt-1">Please present this pass at the main security gate.</p>
          </div>

          <!-- Master Splitting Grid Layout -->
          <div class="flex flex-row gap-8 w-full items-center justify-center">
            
            <!-- Left Side: QR Image Presentation -->
            <div class="w-1/2 flex flex-col items-center border border-gray-100 p-6 rounded-2xl bg-gray-50">
              <img src="${qrImageSrc}" alt="QR Pass" class="w-[180px] h-[180px] object-contain mix-blend-multiply" />
              <p class="text-xs text-gray-400 font-semibold tracking-wider mt-4">ACCESS CODE</p>
              <h2 class="text-xl font-bold text-gray-800 tracking-widest mt-1">${accessCode}</h2>
            </div>

            <!-- Right Side: Clean Structured Details List -->
            <div class="w-1/2 space-y-4">
              <h3 class="text-base font-bold text-gray-700 tracking-wide border-b border-gray-100 pb-2">Guest Details</h3>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-400 font-medium">Full Name</span>
                <span class="font-semibold text-gray-800 text-right">${guestName}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-400 font-medium">Visit Date</span>
                <span class="font-semibold text-gray-800 text-right">${visitDate}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-400 font-medium">Visit Time</span>
                <span class="font-semibold text-gray-800 text-right">${visitTime}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-400 font-medium">Purpose</span>
                <span class="font-semibold text-gray-800 text-right">${purpose}</span>
              </div>
            </div>

          </div>

        </div>
        <script>
          // Allow internal browser window structural initialization before triggering print
          setTimeout(() => {
            window.print();
            window.close();
          }, 300);
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};




  // Function 2: Native Device Share (Web Share API)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Guest Invitation Pass",
          text: shareMessage,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback if browser doesn't support native sharing
      alert("Sharing not supported on this browser. Use WhatsApp or Download option.");
    }
  };
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
        items-center"
        ref={printRef}>


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

            <button 
            onClick={handleNativeShare}
            className="
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
            cursor-pointer
            ">

              <FiShare2 />

              Share

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
              cursor-pointer"
              onClick={handleDownloadPDF}
              >

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

                Back

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