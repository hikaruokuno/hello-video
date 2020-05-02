import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
import { signIn, signOut, fetchMember } from '../actions';
import 'firebase/firestore';

class Auth extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.signIn();
        this.props.fetchMember(user);
      } else {
        this.props.signOut();
      }
    });
  }

  googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  };

  googleSignOut = () => {
    firebase.auth().signOut();
  };

  render() {
    return <div>a</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.members,
  };
};

export default connect(mapStateToProps, { signIn, signOut, fetchMember })(Auth);
