import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchVideo, selectedMember } from '../../actions';
import VideoDetail from './VideoDetail';
import VideoItem from './VideoItem';
import Paging from './Paging';
import { randomOg } from '../../reducers/groupsReducer';

const VideoShow = (props) => {
  const { auth } = props;
  const authenticated = !auth.isEmpty;
  if (!authenticated && !auth.isLoaded) {
    return <div>よみこみ中...</div>;
  }
  useEffect(() => {
    if (props.members.length === 0) {
      if (!authenticated && auth.isLoaded) {
        const randomMember = randomOg();
        props.fetchVideo(randomMember);
        props.selectedMember(randomMember);
        return;
      }
    } else {
      props.fetchVideo(props.members[0].name);
      props.selectedMember(props.members[0].name);
    }
  }, [props.members]);

  const video = props.videos;
  if (video.length === 0) {
    return <div>推し追で、推しを追加してください。</div>;
  }

  return (
    <div>
      <VideoDetail video={video.items[0]} />
      <div className="ui relaxed divided list">
        <VideoItem />
      </div>
      <Paging page={video} />
    </div>
  );
};

const mapStateTpProps = (state) => {
  return {
    videos: state.videos,
    members: state.members,
  };
};

export default connect(mapStateTpProps, { fetchVideo, selectedMember })(
  VideoShow
);
