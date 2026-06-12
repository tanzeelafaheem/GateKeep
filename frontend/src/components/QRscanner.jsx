import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";


const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    let scanner;
    let isMounted = true;

    const startScanner = async () => {
      try {
        scanner = new Html5Qrcode("reader");

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 500,
          },
          (decodedText) => {
            onScanSuccess(decodedText);
            scanner.stop();
          },
          () => {}
        );
      } catch (err) {
        console.error("Scanner error:", err);
      }
    };

    startScanner();

    return async () => {
      try {
        if (
          scanner &&
          isMounted &&
          scanner.isScanning
        ) {
          await scanner.stop();
          await scanner.clear();
        }
      } catch (err) {
        console.log("Cleanup ignored:", err);
      }
    };
  }, [onScanSuccess]);

  return (
  <div
    id="qr-reader"
    style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      inset: 0,
    }}
  />
  );
};

export default QRScanner;