import React from "react";
import Slider from "rc-slider";
import { useAuth } from "../context/AuthContext";
import "rc-slider/assets/index.css";
import { useState } from "react";

function StatsSection({ GetStore_Func, addsize, maxBandwidth = 100, maxStorage = 50 }) {
  const { user } = useAuth();
  const [storageUsed, setStorageUsed] = useState(0);
  const [bandwidthUsed, setBandwidthUsed] = useState(0);

  const handleStorage = async () => {
    const bdy = await GetStore_Func(user.username);
    setBandwidthUsed(bdy.totalUsageToday);
  };

  handleStorage();

  const bandwidthPercentage = Math.min((bandwidthUsed / maxBandwidth) * 100, 100);
  const storagePercentage = Math.min((storageUsed / maxStorage) * 100, 100);

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
          trackStyle={{ backgroundColor: "#007bff", height: 8 }}
          handleStyle={{
            borderColor: "#007bff",
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -6,
            backgroundColor: "#fff",
          }}
          railStyle={{ backgroundColor: "#e4e4e4", height: 8 }}
          disabled
        />
        <p className="mt-2 text-center">{bandwidthPercentage.toFixed(2)}%</p>
      </div>
      <div className="mb-3">
        <p>
          Storage Used: <strong>{storageUsed.toFixed(2)} MB</strong> / {maxStorage} MB
        </p>
        <Slider
          value={storagePercentage}
          max={100}
          trackStyle={{ backgroundColor: "#007bff", height: 8 }}
          handleStyle={{
            borderColor: "#007bff",
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -6,
            backgroundColor: "#fff",
          }}
          railStyle={{ backgroundColor: "#e4e4e4", height: 8 }}
          disabled
        />
        <p className="mt-2 text-center">{storagePercentage.toFixed(2)}%</p>
      </div>
    </section>
  );
}

export default StatsSection;

