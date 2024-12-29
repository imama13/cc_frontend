import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function StatsSection({ bandwidthUsed, maxBandwidth = 100 }) {
  // Calculate percentage for the slider
  const bandwidthPercentage = Math.min((bandwidthUsed / maxBandwidth) * 100, 100);

  return (
    <section id="stats-section" className="my-4">
      <h2>Bandwidth Usage</h2>
      <div className="mb-3">
        <p>
          Bandwidth Used: <strong>{bandwidthUsed.toFixed(2)} MB</strong> / {maxBandwidth} MB
        </p>
        <Slider
          value={bandwidthPercentage}
          max={100}
          disabled
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
        />
        <p className="mt-2 text-center">{bandwidthPercentage.toFixed(2)}%</p>
      </div>
    </section>
  );
}

export default StatsSection;

