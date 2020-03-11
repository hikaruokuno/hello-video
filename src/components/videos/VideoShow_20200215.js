import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../../actions';
import Button from '@material-ui/core/Button';
import VideoList from './VideoList';

const VideoShow = props => {
  const { auth } = props;
  const authenticated = !auth.isEmpty;
  // console.log('authenticated', authenticated);
  // console.log('isLoaded', auth.isLoaded);
  if (!authenticated && !auth.isLoaded) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (props.members.length === 0) {
      if (!authenticated && auth.isLoaded) {
        console.log('初期表示時');
        props.fetchVideo('道重さゆみ');
        return;
      }
    } else {
      console.log('membersが更新された');
      props.fetchVideo(props.members[0].name);
    }

    // props.fetchVideo(props.members[0].name);
  }, [props.members]);

  const video = props.videos;

  if (video.length === 0) {
    return <div>Loading...</div>;
  }
  // if (!authenticated && !auth.isLoaded) {
  //   return <div className="ui active inline loader"></div>;
  // }
  const renderList = () => {
    console.log(video.items[0]);
    const videoSrc = `https://www.youtube.com/embed/${video.items[0].id.videoId}`;
    return (
      <div>
        <div className="ui embed">
          <iframe title="video player" src={videoSrc} />
        </div>
        <div className="ui segment">
          <h4 className="ui header">{video.items[0].snippet.title}</h4>
          {/* <p>{item.snippet.description}</p> */}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>{renderList()}</div>
      <VideoList video={video} />
    </div>
  );
};

const mapStateTpProps = state => {
  return {
    videos: state.videos,
    members: state.members
  };
};

export default connect(mapStateTpProps, { fetchVideo })(VideoShow);
