import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
import { signIn, signOut, fetchMember } from '../actions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'firebase/firestore';

class Auth extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.signIn();
        this.props.fetchMember(user);
        // const userUId = user.uid;
        // const lists = [
        //   { id: 0, name: '譜久村聖', color: 'hotpink', isDone: false },
        //   { id: 1, name: '生田衣梨奈', color: 'greenyellow', isDone: false },
        //   { id: 2, name: '石田亜佑美', color: 'royalblue', isDone: false },
        //   { id: 3, name: '佐藤優樹', color: '#00a968', isDone: false },
        //   { id: 4, name: '小田さくら', color: 'violet', isDone: false },
        //   { id: 5, name: '野中美希', color: 'purple', isDone: false },
        //   { id: 6, name: '牧野真莉愛', color: 'lightpink', isDone: false },
        //   { id: 7, name: '羽賀朱音', color: 'orange', isDone: false },
        //   { id: 8, name: '加賀楓', color: 'red', isDone: false },
        //   { id: 9, name: '横山玲奈', color: 'gold', isDone: false },
        //   { id: 10, name: '森戸知沙希', color: 'white', isDone: false }
        // ];
        // const db = firebase.firestore();

        // const userInfo = db.collection('users').doc(userUId);
        // lists.forEach(list => {
        //   db.collection('users')
        //     .doc(userUId)
        //     .collection('members')
        //     .doc(list.name)
        //     .set({ name: list.name })
        //     .then(function() {
        //       console.log('Document written');
        //     })
        //     .catch(function(error) {
        //       console.error('Error adding document: ', error);
        //     });
        // });
      } else {
        // console.log(signOut);
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

  // renderAuthButton() {
  //   if (this.props.isSignedIn === null) {
  //     return <div className="ui active inline loader"></div>;
  //   } else if (this.props.isSignedIn) {
  //     return <div>Logout</div>;
  //   } else {
  //     return <div>Login</div>;
  //   }
  // }

  render() {
    return <div>a</div>;
    // if (this.props.isSignedIn) {
    //   return (
    //     <Button
    //       onClick={this.googleSignOut}
    //       color="inherit"
    //       to="/"
    //       component={Link}
    //     >
    //       {this.renderAuthButton()}
    //     </Button>
    //   );
    // } else {
    //   return (
    //     <Button
    //       onClick={this.googleSignIn}
    //       color="inherit"
    //       to="/"
    //       component={Link}
    //     >
    //       {this.renderAuthButton()}
    //     </Button>
    //   );
    // }
  }
}

const mapStateToProps = state => {
  console.log(state);
  // TODO: store?index?でredusersを読むようにする
  // reduserのindex.jsでfirebase追加する？
  // rootReduserってなんだろ？
  return {
    // isSignedIn: state.auth.isSignedIn,
    members: state.members
  };
};

export default connect(mapStateToProps, { signIn, signOut, fetchMember })(Auth);
