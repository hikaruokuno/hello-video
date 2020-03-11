import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchVideo, selectedMember } from '../../actions';
import Button from '@material-ui/core/Button';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import VideoItem from './VideoItem';
import Paging from './Paging';
import { randomOg } from '../../reducers/groupsReducer';

const VideoShow = props => {
  const { auth } = props;
  const authenticated = !auth.isEmpty;
  // console.log('authenticated', authenticated);
  // console.log('isLoaded', auth.isLoaded);
  if (!authenticated && !auth.isLoaded) {
    return <div>よみこみ中...</div>;
  }
  useEffect(() => {
    if (props.members.length === 0) {
      console.log('誰も追加してない');
      if (!authenticated && auth.isLoaded) {
        console.log('初期表示時');
        // TODO: ここにOG入れてランダム表示するようにする
        // props.fetchVideo('道重さゆみ');
        const randomMember = randomOg();
        props.fetchVideo(randomMember);
        props.selectedMember(randomMember);
        return;
      }
      // else {
      //   // TODO: ログアウト時にフェッチビデオしてるか？
      //   console.log('誰も追加してないけどログインしてる');
      //   const randomMember = randomOg();
      //   props.fetchVideo(randomMember);
      //   props.selectedMember(randomMember);
      // }
    } else {
      console.log('membersが更新された');
      props.fetchVideo(props.members[0].name);
      props.selectedMember(props.members[0].name);
    }

    // props.fetchVideo(props.members[0].name);
  }, [props.members]);

  const video = props.videos;

  if (video.length === 0) {
    return <div>推し追で、推しを追加してください。</div>;
  }
  // if (!authenticated && !auth.isLoaded) {
  //   return <div className="ui active inline loader"></div>;
  // }
  // console.log(video.nextPageToken);
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
      <VideoDetail video={video.items[0]} />
      {/* <div>{renderList()}</div> */}
      {/* <VideoList video={video} /> */}
      <div className="ui relaxed divided list">
        <VideoItem />
      </div>
      <Paging page={video} />
    </div>
  );
};

const mapStateTpProps = state => {
  return {
    videos: state.videos,
    members: state.members
  };
};

export default connect(mapStateTpProps, { fetchVideo, selectedMember })(
  VideoShow
);
