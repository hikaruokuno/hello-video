import './VideoItem.css';
import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../../actions';

const VideoItem = (props) => {
  let items = new Array();
  for (let i = 1; i < props.video.items.length; i++) {
    items.push(props.video.items[i]);
  }
  return items.map((item) => {
    return (
      <div onClick={() => props.selectVideo(item)} className="video-item item">
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
  });
};

const mapStateToProps = (state) => {
  return { video: state.videos };
};

export default connect(mapStateToProps, { selectVideo })(VideoItem);
