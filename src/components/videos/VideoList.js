import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ video }) => {
  let items = new Array();
  for (let i = 1; i < video.items.length; i++) {
    items.push(video.items[i]);
  }

  const renderdList = items.map((v) => {
    return <VideoItem key={v.id.videoId} video={v} />;
  });

  return <div className="ui relaxed divided list">{renderdList}</div>;
};

export default VideoList;
