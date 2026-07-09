import { useState } from "react";
import Navbar from "../../components/Navbar";
import QRScanner from "../../components/QRScanner";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/scan.png";

const QRScan = () => {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const handleScanSuccess = (decodedText) => {
  // 1. Instantly toggle active flag down to shut off webcam streams
  setShowScanner(false);

  // 2. Parse the flat data format directly
  try {
    const visitorData = JSON.parse(decodedText);
    
    // Fallback normalization logic handles both nested and flat schemas safely
    const rawGuest = visitorData?.guest ? visitorData.guest : visitorData;

    if (rawGuest?.name && rawGuest?.phone) {
      console.log("Visitor Data successfully parsed:", rawGuest);
      
      // Remap flat keys safely to meet your /guard/verify UI specifications
      const normalizedGuest = {
        name: rawGuest.name,
        phone: rawGuest.phone,
        purpose: rawGuest.purpose || "Not Specified",
        visitDate: rawGuest.visitDate || rawGuest.date,
        visitTime: rawGuest.visitTime || rawGuest.time,
        status: rawGuest.status || "PENDING",
        qrCode: rawGuest.qrCode || rawGuest.guestId || "N/A",
        residentId: rawGuest.residentId,
      };

      // Navigate gate guard to verification portal
      navigate("/guard/qr-scan/verify", {
      state: {
      qrCode: visitorData.qrCode,
  },
});
    } else {
      console.error("Missing critical identity credentials inside QR package:", visitorData);
      alert("Invalid QR Code payload structure. Missing visitor name or phone registration.");
    }
  } catch (e) {
    console.error("Invalid QR payload structure parsed on reception intake:", e);
    alert("Could not process QR configuration data.");
  }
};


  return (
    <>
      <Navbar />

      <div className="h-[calc(100vh-70px)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mx-5 mt-5 mb-2 z-10">
          <div>
            <h1 className="text-2xl font-bold">Main North Gate</h1>
            <p className="text-gray-600 text-sm">
              GATEKEEP SECURITY SYSTEM
            </p>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {/* Background */}
          <img
            src={bg}
            alt="Scan QR"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay Mask */}
          <div className="absolute inset-0 bg-black/40 z-0" />

          {/* Scanner Area Stack */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-72 h-72 rounded-xl overflow-hidden bg-black/30">
              
              {/* CAMERA LAYER: Keeps it in its own isolated visual track */}
              <div
                className="absolute inset-0 w-full h-full z-1"
                style={{
                  display: showScanner ? "block" : "none",
                }}
              >
                <QRScanner
                  onScanSuccess={handleScanSuccess}
                  active={showScanner}
                />
              </div>

              {/* PLACEHOLDER LAYER */}
              {!showScanner && (
                <div className="absolute inset-0 w-full h-full bg-black/60 flex items-center justify-center text-white text-lg z-2">
                  Place QR Code Here
                </div>
              )}

              {/* OVERLAY GRAPHICS LAYER: Separated out to prevent visual blockage */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Scanner Border Frame */}
                <div className="absolute inset-0 border-2 border-white/40 rounded-xl" />

                {/* Animated Scanning Laser Line */}
                {showScanner && (
                  <div className="absolute left-0 w-full h-1 bg-green-400 shadow-[0_0_8px_#4ade80] animate-scan" />
                )}

                {/* Scope Target Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-green-400 rounded-tl-sm"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-green-400 rounded-tr-sm"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-green-400 rounded-bl-sm"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-green-400 rounded-br-sm"></div>
              </div>

            </div>
          </div>

          {/* Instructions */}
          {showScanner && (
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white font-semibold z-20 drop-shadow-md">
              Align QR Code inside the frame
            </div>
          )}

          {/* Controls Button Row */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
            {!showScanner ? (
              <button
                onClick={() => setShowScanner(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md cursor-pointer transition-colors"
              >
                Scan QR
              </button>
            ) : (
              <button
                onClick={() => setShowScanner(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md cursor-pointer transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QRScan;
