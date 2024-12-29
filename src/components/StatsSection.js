import React from "react";

function StatsSection({ storageUsed, bandwidthUsed }) {
  return (
    <section id="stats-section">
      <h2>Usage Statistics</h2>
      <p>
        Storage Used: <span id="storageUsed">{storageUsed.toFixed(2)}</span> MB
      </p>
      <p>
        Bandwidth Used: <span id="bandwidthUsed">{bandwidthUsed.toFixed(2)}</span> MB
      </p>
    </section>
  );
}

export default StatsSection;

