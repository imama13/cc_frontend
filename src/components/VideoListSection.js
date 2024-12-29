import React from "react";

function VideoListSection({ videos }) {
  return (
    <section id="video-list-section" className="mb-5">
      <h2>Your Videos</h2>
      <div id="video-list" className="row">
        {videos.map((video, index) => (
          <div key={index} className="col-md-4 mb-3">
            <video controls width="100%">
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VideoListSection;

