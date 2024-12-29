import React, { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoSize, setVideoSize] = useState(0); // Video size in MB
  const [storageUsed, setStorageUsed] = useState(0.0);
  const [bandwidthUsed, setBandwidthUsed] = useState(0.0);
  const [uploadError, setUploadError] = useState(false);
  const [videos, setVideos] = useState([]);

  return (
    <VideoContext.Provider
      value={{
        videoSize,
        setVideoSize,
        storageUsed,
        setStorageUsed,
        bandwidthUsed,
        setBandwidthUsed,
        uploadError,
        setUploadError,
        videos,
        setVideos
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
