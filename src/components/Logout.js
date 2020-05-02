import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchMember,
  clearMember,
  fetchVideo,
  selectedMember,
} from '../actions';
import firebase from 'firebase/app';
import { randomOg } from '../reducers/groupsReducer';

const Logout = (props) => {
  useEffect(() => {
    const test = async () => {
      console.log('fetchMember実行');
      await props.fetchMember(props.firebase.auth.uid);
      console.log('fetchMember終了', props);
    };

    const awaitTestFetchVideo = async () => {
      await test();
      console.log('testメソッド終了', props);
    };
    awaitTestFetchVideo();
  }, []);

  console.log(props);
  const googleSignOut = () => {
    console.log('logout', props);
    firebase.auth().signOut();
    props.clearMember();
    props.fetchVideo(randomOg());
    props.selectedMember();
  };

  return (
    <Button onClick={googleSignOut} color="inherit" to="/" component={Link}>
      ログアウト
    </Button>
  );
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    members: state.members,
  };
};

export default connect(mapStateToProps, {
  fetchMember,
  clearMember,
  fetchVideo,
  selectedMember,
})(Logout);
