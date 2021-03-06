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
      await props.fetchMember(props.firebase.auth.uid);
    };

    const awaitTestFetchVideo = async () => {
      await test();
    };
    awaitTestFetchVideo();
  }, []);

  const googleSignOut = () => {
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
