import React, { useState } from "react";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import VideoListSection from "../components/VideoListSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";
import '../styles/styles.css'
import { UploadVideo } from '../utils/UploadVideo';
import { GetStorageInfo } from '../utils/GetStorageInfo';
// index.js or App.js
import { useAuth } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [addSize, setAddSize] = useState(0.0);  // Initialize the state

   const handleUpload = async (videoFile, videoSize) => {
    if (!user) {
      alert("You must be logged in to upload videos.");
      return;
    }

    try {
      await UploadVideo(videoFile, videoSize, user.username);
      // Optionally update state after successful upload
      console.log("Video uploaded successfully");
      setAddSize(videoSize);  // Update the state
    } catch (error) {
      console.error("Error uploading video:", error.message);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content container mt-4">
        <h1>Welcome to the Video Streaming App</h1>
        <UploadSection onUpload={handleUpload} />
        <VideoListSection videos={videos} />
        <StatsSection GetStore_Func={ GetStorageInfo } addsize={ addSize }/>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

