import React from 'react';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    await firebase.auth().signInWithRedirect(provider);
  };

  return (
    <Button onClick={googleSignIn} color="inherit" to="/" component={Link}>
      ログイン
    </Button>
  );
};

export default Login;
