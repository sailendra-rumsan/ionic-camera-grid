import React, { useEffect, useRef, useState } from "react";
import { IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { camera, close } from "ionicons/icons";
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from "@capacitor-community/camera-preview";

import "./Camera.css"; // Create this CSS file next

const Camera: React.FC = () => {
  const cameraPreviewRef = useRef<HTMLDivElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const startAndStopCamera = async () => {
      if (cameraPreviewRef.current) {
        await startCamera();
      }

      return () => {
        stopCamera();
      };
    };

    startAndStopCamera();
  }, []); // Run once on component mount and clean up on unmount

  const startCamera = async () => {
    const cameraPreviewOptions: CameraPreviewOptions = {
      parent: cameraPreviewRef.current?.id, // Use the ref's ID
      position: "rear",
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      toBack: true, // Crucial: Puts the camera preview behind your HTML content
    };

    try {
      if (!cameraPreviewRef.current) {
        console.error("Camera preview element not found.");
        return;
      }
      cameraPreviewRef.current.style.display = "block"; // Ensure the div is visible
      await CameraPreview.start(cameraPreviewOptions);
      console.log("Camera preview started");
    } catch (error) {
      console.error("Error starting camera preview", error);
      // Handle error, e.g., show an alert to the user
    }
  };

  const stopCamera = async () => {
    try {
      await CameraPreview.stop();
      if (cameraPreviewRef.current) {
        cameraPreviewRef.current.style.display = "none"; // Hide the div when camera stops
      }
      console.log("Camera preview stopped");
    } catch (error) {
      console.error("Error stopping camera preview", error);
    }
  };

  const takePhoto = async () => {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 90,
    };

    try {
      const result = await CameraPreview.capture(cameraPreviewPictureOptions);
      const base64Picture = `data:image/jpeg;base64,${result.value}`;
      setCapturedImage(base64Picture);
      console.log("Photo captured:", base64Picture);

      // You can now do something with base64Picture,
      // e.g., navigate to a preview page, upload it, etc.
      // For this example, we'll just display it if capturedImage state is set.
    } catch (error) {
      console.error("Error capturing photo", error);
    }
  };

  return (
    <>
      <IonContent className="camera-content">
        {" "}
        {/* Add class for styling */}
        {/* This div will hold the camera preview, it must have an ID for the plugin */}
        {!capturedImage && (
          <>
            <div id="cameraPreview" ref={cameraPreviewRef}></div>

            <div className="gradient-corners-box"></div>
            {/* Capture button */}
            <IonFab
              vertical="bottom"
              horizontal="center"
              slot="fixed"
              className="capture-button"
            >
              <IonFabButton onClick={takePhoto}>
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
            </IonFab>
          </>
        )}
        {/* Display captured image (optional) */}
        {capturedImage && (
          <div className="captured-image-container">
            <img
              src={capturedImage}
              alt="Captured"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <IonFab
              vertical="top"
              horizontal="end"
              slot="fixed"
              className="close-button"
            >
              <IonFabButton onClick={() => setCapturedImage(undefined)}>
                <IonIcon icon={close}></IonIcon>
              </IonFabButton>
            </IonFab>
          </div>
        )}
      </IonContent>
    </>
  );
};

export default Camera;
