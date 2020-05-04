import React from 'react';
import { connect } from 'react-redux';
import './VideoDetail.css';

const VideoDetail = ({ video, init }) => {
  if (!video) {
    const videoSrc = `https://www.youtube.com/embed/${init.id.videoId}`;
    return (
      <div>
        <div className="ui embed video-detail">
          <iframe title="video player" src={videoSrc} />
        </div>
        <div className="ui segment">
          <h4 className="ui header">{init.snippet.title}</h4>
        </div>
      </div>
    );
  }
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div>
      <div className="ui embed video-detail">
        <iframe title="video player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.videos.items[0]);
  return {
    video: state.selectedVideo,
    init: state.videos.items[0],
  };
};

export default connect(mapStateToProps)(VideoDetail);
