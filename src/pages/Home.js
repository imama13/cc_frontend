import React, { useState } from "react";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import VideoListSection from "../components/VideoListSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";
import '../styles/styles.css'
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const [videos, setVideos] = useState([]);
  const [storageUsed, setStorageUsed] = useState(0);
  const [bandwidthUsed, setBandwidthUsed] = useState(0);

  const handleUpload = (video) => {
    // Logic for uploading video
    setVideos((prevVideos) => [...prevVideos, video]);
    setStorageUsed((prev) => prev + video.size / (1024 * 1024)); // Convert bytes to MB
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content container mt-4">
        <h1>Welcome to the Video Streaming App</h1>
        <UploadSection onUpload={handleUpload} />
        <VideoListSection videos={videos} />
        <StatsSection storageUsed={storageUsed} bandwidthUsed={bandwidthUsed} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

