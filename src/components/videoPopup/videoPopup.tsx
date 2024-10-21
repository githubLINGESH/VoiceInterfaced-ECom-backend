import React, { useEffect, useState } from "react";
import './videoPopup.css';

const VideoPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  if (!show) return null;

  return (
    <div className="video-popup-overlay">
      <div className="video-popup-content">
        <button onClick={onClose} className="close-button">X</button>
        <video
          controls
          autoPlay
          className="video-popup-video"
        >
          <source src="VComFeature.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPopup;
