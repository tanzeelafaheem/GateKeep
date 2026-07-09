import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

// Persistent global variable to guarantee a single instance across unmount cycles
let globalHtml5QrcodeInstance = null;

const QRScanner = ({ onScanSuccess, active }) => {
  const isStartedRef = useRef(false);

  useEffect(() => {
    // 1. Singleton initialization block
    if (!globalHtml5QrcodeInstance) {
      try {
        globalHtml5QrcodeInstance = new Html5Qrcode("qr-reader");
      } catch (e) {
        console.error("Failed to boot global hardware controller:", e);
        return;
      }
    }

    const startCamera = async () => {
      if (isStartedRef.current) return;

      try {
        await globalHtml5QrcodeInstance.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            // Prevent multiple parallel scans during structural state liftoff
            if (!isStartedRef.current) return;
            onScanSuccess(decodedText);
          },
          () => {} // Silent framing loop execution
        );
        isStartedRef.current = true;
      } catch (err) {
        console.error("Camera engine refused to engage:", err);
        isStartedRef.current = false;
      }
    };

    const stopCamera = async () => {
      if (!isStartedRef.current) return;
      isStartedRef.current = false;

      try {
        // Checking if engine instance actively holds an operative camera track
        if (globalHtml5QrcodeInstance && globalHtml5QrcodeInstance.isScanning) {
          await globalHtml5QrcodeInstance.stop();
        }
      } catch (stopError) {
        console.warn("Caught and suppressed redundant camera stop event:", stopError);
      } finally {
        try {
          await globalHtml5QrcodeInstance.clear();
        } catch (clearError) {
          // Suppress DOM clearing exceptions quietly
        }
      }
    };

    if (active) {
      startCamera();
    } else {
      stopCamera();
    }

    // Standard unmount hook
    return () => {
      stopCamera();
    };
  }, [active, onScanSuccess]);

  return <div id="qr-reader" style={{ width: "100%", height: "100%" }} />;
};

export default QRScanner;
