import React from "react";
import Slider from "rc-slider";
import { useAuth } from "../context/AuthContext";
import { useVideo } from "../context/VideoContext";
import "rc-slider/assets/index.css";
import { useState } from "react";


function StatsSection({maxBandwidth = 100, maxStorage = 50 }) {
  const { user } = useAuth();
  const { storageUsed, setStorageUsed, bandwidthUsed, setBandwidthUsed, uploadError, setUploadError } = useVideo();

  const bandwidthPercentage = Math.min((bandwidthUsed / maxBandwidth) * 100, 100);
  const storagePercentage = Math.min((storageUsed / maxStorage) * 100, 100);
  const storageRemaining = Math.max(maxStorage - storageUsed, 0);

  // Determine bar color for storage
  const storageBarColor = storagePercentage > 80 ? "red" : "#007bff";
  const bandwidthBarColor = bandwidthPercentage >= 100 ? "red" : "#007bff";

  return (
    <section id="stats-section" className="my-4">
      <h2>Usage</h2>
      <div className="mb-3">
        <p>
          Daily Bandwidth Used: <strong>{bandwidthUsed.toFixed(2)} MB</strong> / {maxBandwidth} MB
        </p>
        <Slider
          value={bandwidthPercentage}
          max={100}
          trackStyle={{ backgroundColor: bandwidthBarColor, height: 8 }}
          handleStyle={{
            borderColor: bandwidthBarColor,
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -6,
            backgroundColor: "#fff",
          }}
          railStyle={{ backgroundColor: "#e4e4e4", height: 8 }}
          disabled
        />
    {bandwidthPercentage == 100 || <p className="mt-2 text-center">{bandwidthPercentage.toFixed(2)}%</p>}
    {bandwidthPercentage == 100 && <p className="mt-2 text-center" style = {{ color: "red", fontWeight: "bold" }}>Daily Bandwidth exceeded, wait tomorrow to upload more!</p>}
      </div>
      <div className="mb-3">
        <p>
          Storage Used: <strong>{storageUsed.toFixed(2)} MB</strong> / {maxStorage} MB
        </p>
        <Slider
          value={storagePercentage.toFixed(2)}
          max={100}
          trackStyle={{ backgroundColor: storageBarColor, height: 8 }}
          handleStyle={{
            borderColor: storageBarColor,
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -6,
            backgroundColor: "#fff",
          }}
          railStyle={{ backgroundColor: "#e4e4e4", height: 8 }}
          disabled
        />
        <p className="mt-2 text-center" style={{ color: storageBarColor, fontWeight: "bold" }}>
          {storagePercentage.toFixed(2)}% storage consumed, {storageRemaining.toFixed(2)} MB left
        </p>
      </div>
    </section>
  );
}

export default StatsSection;
