import React, { useState } from "react";

function UploadSection({ onUpload }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoSize, setVideoSize] = useState(0); // Video size in MB
  const [status, setStatus] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const sizeInMB = file.size / 1024 / 1024; // Convert bytes to MB
      setVideoSize(sizeInMB); // Convert bytes to MB
      setStatus('Selected file: ' + file.name + ' (' + sizeInMB.toFixed(2) + ' MB)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile) {
      onUpload(videoFile, videoSize);
      setVideoFile(null);
    }
  };

  return (
    <section id="upload-section" className="mb-5">
      <h2>Upload a Video</h2>
      <p>{status}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/mp4"
          className="form-control mb-2"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </section>
  );
}

export default UploadSection;

