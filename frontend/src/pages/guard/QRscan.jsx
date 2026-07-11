import { useState,useEffect } from "react";
import Navbar from "../../components/Navbar";
import QRscanner from "../../components/QRscanner";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/scan.png";
import { toast } from "react-toastify";
import { FaUser,FaSignOutAlt,FaIdCard,FaDoorOpen,FaPhone } from "react-icons/fa";
import guardImg from '../../assets/guard.jpeg'

const QRScan = () => {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [guard, setGuard] = useState(null);


  useEffect(() => {
    const storedGuard = localStorage.getItem("guard"); 
    if (storedGuard) {
      try {
        setGuard(JSON.parse(storedGuard));
      } catch (error) {
        console.error("Error parsing guard data from localStorage", error);
      }
    }
  }, []);
   const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if(confirmLogout){
    localStorage.removeItem("guard"); 
    localStorage.removeItem("token"); // clear your auth token if any
    
    toast.warn("Logged out successfully");
    navigate("/");
    }
    else{
      toast.info("Logout cancelled")
    }
  };

 const handleScanSuccess = (decodedText) => {
  try {
    setShowScanner(false);
    toast.success("QR Code scanned successfully!");

    if (!decodedText) {
      throw new Error("No data found in QR code");
    }

    navigate("/guard/qr-scan/verify", { 
      state: { qrCode: decodedText }, 
    });
  } catch (error) {
    toast.error("QR Scan Navigation Error:", error.message);
  }
};



  return (
    <>
      <div className="h-[calc(100vh-70px)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mx-5 mt-5 mb-2 z-30">
          <div>
            {/* Dynamically fallback to object schema values */}
            <h1 className="text-2xl font-bold">
              {guard?.gate || "Main North Gate"}
            </h1>
            <p className="text-gray-600 text-sm">
              GATEKEEP SECURITY SYSTEM
            </p>
          </div>
          
          {/* User Profile Dropdown Container */}
          <div className="relative mr-8">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors focus:outline-none"
            >
              <img className="h-15 w-15 object-cover rounded-full" src={guardImg} alt="" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <>
                {/* Backdrop overlay to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-40 cursor-default" 
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Menu Card */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-3 z-55 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Active security personnel</p>
                    <p className="text-base font-bold text-gray-800 mt-0.5">
                      {guard?.name || "Loading..."}
                    </p>
                  </div>
                  
                  {guard && (
                    <div className="px-4 py-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaIdCard className="mr-2 text-gray-400 shrink-0" />
                        <span>Employee ID: {guard.employeeId}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaDoorOpen className="mr-2 text-gray-400 shrink-0" />
                        <span className="truncate">Station: {guard.gate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaPhone className="mr-2 text-gray-400 shrink-0" />
                        <span>Contact: {guard.phone}</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-100 mt-2 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left font-medium"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden ">
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
              
              {/* CAMERA LAYER */}
              <div
                className="absolute inset-0 w-full h-full z-1"
                style={{
                  display: showScanner ? "block" : "none",
                }}
              >
                <QRscanner
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

              {/* OVERLAY GRAPHICS LAYER */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 border-2 border-white/40 rounded-xl" />

                {showScanner && (
                  <div className="absolute left-0 w-full h-1 bg-green-400 shadow-[0_0_8px_#4ade80] animate-scan" />
                )}

                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-green-400 rounded-tl-sm"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-green-400 rounded-tr-sm"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-green-400 rounded-bl-sm"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-green-400 rounded-tr-sm"></div>
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

