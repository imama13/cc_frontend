import React from "react";
import "../styles/video.css";
import { useAuth } from "../context/AuthContext";
import { deleteVideo } from "../utils/DeleteVideo";
import { useVideo } from "../context/VideoContext";


function Video({ video }) {
  const jwt_token = useAuth().getToken();
  const { videos, setVideos, setStorageUsed } = useVideo(); // Access videos and the updater function from context

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the video "${video.title}"?`)) {
      try {
        await deleteVideo(jwt_token, video._id); // Delete the video from the backend
        setVideos((prevVideos) => prevVideos.filter((v) => v._id !== video._id)); // Update context state
        setStorageUsed((prevStorage) => prevStorage - video.size); // Update storage used
        alert("Video deleted successfully.");
      } catch (err) {
        alert(err.message || "Failed to delete video.");
      }
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card video-card shadow-sm h-100">
        <div className="video-wrapper">
          <video controls className="card-img-top video-player">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{video.title}</h5>
          <p className="card-text text-muted">
            {video.description || "No description available."}
          </p>
      { video._id && 
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <small className="text-muted">ID: {video._id}</small>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
      }
        </div>
      </div>
    </div>
  );
}

export default Video;
