import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import scan from "../../assets/scan.png";
import QRScanner from "../../components/QRscanner";

const QRscan = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [visitor, setVisitor] = useState(null);

  const handleScan = (data) => {
    console.log(data);

    setVisitor({
      name: "Test Visitor",
      phone: data,
      purpose: "Scanned Successfully",
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between mx-5 mt-5 mb-2 z-10">
        <div>
          <h1 className="text-2xl font-bold">Main North Gate</h1>
          <p className="text-gray-600 text-sm">
            GATEKEEP SECURITY SYSTEM
          </p>
        </div>

        <FaRegUserCircle size={30} />
      </div>

      <div className="relative flex-1 overflow-hidden">
        {!showScanner ? (
          <>
            {/* Background Image */}
            <img
              src={scan}
              alt="Scan QR"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Scanner Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-72 border-4 border-white rounded-xl overflow-hidden">
                <div className="absolute left-0 w-full h-1 bg-green-400 animate-scan"></div>

                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-green-400"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-green-400"></div>
              </div>
            </div>

            {/* Button */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
              <button
                onClick={() => setShowScanner(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Scan QR
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Camera Scanner */}
            <QRScanner onScanSuccess={handleScan} />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

            {/* Scanner Box */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 border-2 border-white rounded-xl" />

                <div className="absolute left-0 w-full h-1 bg-green-400 animate-scan" />

                <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-green-400"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-green-400"></div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-32 w-full text-center text-white font-medium">
              Align QR Code inside the frame
            </div>

            {/* Visitor Card */}
            {visitor && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl w-80">
                <h2 className="font-bold text-lg">{visitor.name}</h2>

                <p>Phone: {visitor.phone}</p>
                <p>Purpose: {visitor.purpose}</p>

                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg">
                  Approve Entry
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QRscan;