import React, { useState } from "react";

function UploadSection({ onUpload }) {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile) {
      onUpload(videoFile);
      setVideoFile(null);
    }
  };

  return (
    <section id="upload-section" className="mb-5">
      <h2>Upload a Video</h2>
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

