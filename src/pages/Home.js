import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import VideoListSection from "../components/VideoListSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";
import '../styles/styles.css'
import { UploadVideo } from '../utils/UploadVideo';
import { GetStorageInfo } from '../utils/GetStorageInfo';
import { GetVideos } from "../utils/GetVideos";
// index.js or App.js
import { useAuth } from "../context/AuthContext";
import { useVideo } from "../context/VideoContext";
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const { user } = useAuth();
  const {videos, setVideos,
          setBandwidthUsed, setStorageUsed} = useVideo();
  const jwt_token = useAuth().getToken();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalSize, setTotalSize] = useState(0.0);

  const handleStorage = async () => {
    const bdy = await GetStorageInfo(user.username);
    setBandwidthUsed(bdy.totalUsageToday);
  };
  useEffect(() => {
    handleStorage();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await GetVideos(jwt_token);
        setVideos(fetchedVideos || []); // Handle cases where API returns undefined/null
      } catch (err) {
        setError(err.message || "Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [jwt_token]);

  useEffect(() => {
    const calculateTotalSize = () => {
      const total = videos.reduce((acc, video) => acc + video.size, 0); // Assuming `video.size` is in MB
      setTotalSize(total);
      setStorageUsed(total);
    };

    calculateTotalSize();
  }, [videos]);
   const handleUpload = async (videoFile, videoSize) => {
    if (!user) {
      alert("You must be logged in to upload videos.");
      return;
    }

    try {
      await UploadVideo(videoFile, videoSize, user.username);
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
        <VideoListSection videos={videos} loading={ loading } error={ error } />
        <StatsSection/>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

