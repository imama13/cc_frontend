import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AddVideo } from "../utils/AddVideo";
import { useVideo } from "../context/VideoContext";

function UploadSection({ onUpload }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState(""); // Video name
  const [videoDescription, setVideoDescription] = useState(""); // Short description
  const [status, setStatus] = useState(null);

  const { setVideos, videoSize, setVideoSize, setStorage,
    storageUsed, setUploadError, uploadError,
    setBandwidthUsed, bandwidthUsed } = useVideo();
  const jwt_token = useAuth().getToken();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    if (file) {
      const sizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      setVideoSize(sizeInMB);
      setStatus(`Selected file: ${file.name} (${sizeInMB.toFixed(2)} MB)`);

      if (sizeInMB + storageUsed > 50) {
        setUploadError(true);
        setStatus("Storage limit exceeded. Please delete some videos.");
      } else {
        setUploadError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !videoName.trim() || !videoDescription.trim()) {
      setStatus("Please provide a video file, name, and description.");
      return;
    }

    try {
      setStatus("Uploading...");
      await onUpload(videoFile, videoSize, videoName, videoDescription);
      const newvideo_url = await AddVideo(jwt_token, videoFile, videoName, videoDescription);
      const newvideo = { "url": newvideo_url.url, "title": videoName, "description": videoDescription, "size": videoSize };
      setVideos((prevVideos) => [newvideo, ...prevVideos]);
      setStorage((prevStorage) => prevStorage + videoSize);
      setBandwidthUsed((prevBandwidth) => prevBandwidth + videoSize);


      setStatus("Video uploaded successfully!");
      setVideoFile(null);
      setVideoName("");
      setVideoDescription("");
    } catch (error) {
      setStatus(`Error uploading video: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <section id="upload-section" className="mb-5">
      <h2>Upload a Video</h2>
      {uploadError && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Not enough storage! Clear space to upload this video.
        </p>
      )}
      {bandwidthUsed > 100 && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Daily bandwidth limit exceeded! Please wait until tomorrow to upload more videos.
        </p>
      )}
      <p>{status}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="videoName" className="form-label">
            Video Name
          </label>
          <input
            type="text"
            id="videoName"
            className="form-control"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            placeholder="Enter the video name"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="videoDescription" className="form-label">
            Short Description
          </label>
          <textarea
            id="videoDescription"
            className="form-control"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            placeholder="Enter a short description of the video"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="videoFile" className="form-label">
            Select Video File
          </label>
          <input
            type="file"
            accept="video/mp4"
            className="form-control"
            id="videoFile"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className={`btn ${uploadError || bandwidthUsed > 100 ? "btn-inactive" : "btn-primary"}`}
          disabled={uploadError || bandwidthUsed > 100}
        >
          Upload
        </button>
      </form>
    </section>
  );
}

export default UploadSection;

