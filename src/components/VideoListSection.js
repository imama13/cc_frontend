import React, { useEffect, useState } from "react";
import Video from "./Video";

function VideoListSection({videos, loading, error}) {

  console.log(videos);

  return (
    <section id="video-list-section" className="mb-5">
      <h2>Your Videos</h2>
      {loading && <p>Loading your videos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && videos.length === 0 && (
        <p>No videos found. Start uploading your videos!</p>
      )}
      <div id="video-list" className="row">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default VideoListSection;

