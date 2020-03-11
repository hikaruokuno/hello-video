import './VideoItem.css';
import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../../actions';

const VideoItem = props => {
  console.log(props);
  let items = new Array();
  for (let i = 1; i < props.video.items.length; i++) {
    items.push(props.video.items[i]);
  }
  return (
    // <div onClick={() => onVideoSelect(video)} className="video-item item">
    items.map(item => {
      return (
        <div
          onClick={() => props.selectVideo(item)}
          className="video-item item"
        >
          <img
            alt={item.title}
            className="ui image"
            src={item.snippet.thumbnails.medium.url}
          />
          <div className="content">
            <div className="header">{item.snippet.title}</div>
          </div>
        </div>
      );
    })
  );
};

const mapStateToProps = state => {
  console.log(state);
  return { video: state.videos };
};

export default connect(mapStateToProps, { selectVideo })(VideoItem);
