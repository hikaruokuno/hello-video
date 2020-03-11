import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
// import VideoDetail from './VideoDetail';
import AuthMemberAdd from './AuthMemberAdd';
import AuthMemberEdit from './AuthMemberEdit';
import MemberList from './members/MemberList';
import VideoList from './videos/VideoList';
import AuthVideoShow from './AuthVideoShow';
import Complete from './members/Complete';
import Header from './Heder';
import firebase from 'firebase';
import 'firebase/firestore';
import config from '../config/firebase-config';

class App extends React.Component {
  constructor() {
    super();

    // firebase.initializeApp(config);
    // firebase.firestore().settings({ timestampsInSnapshots: true });
    // const db = firebase.firestore();
  }

  render() {
    const user = false;
    return (
      <div>
        <BrowserRouter>
          <Header user={user} />
          <div className="ui container">
            <Route path="/" exact component={AuthVideoShow} />
            <Route path="/members/add" exact component={AuthMemberAdd} />
            <Route path="/members/edit" exact component={AuthMemberEdit} />
            <Route path="/videos/list" exact component={VideoList} />
            <Route path="/videos/show" exact component={AuthVideoShow} />
            <Route path="/members/complete" exact component={Complete} />
          </div>
        </BrowserRouter>
        {/* <div className="ui grid">
        <div className="ui row">
          <div className="wide column">
            <VideoDetail />
          </div>
        </div>
      </div> */}
      </div>
    );
  }
}

export default App;
