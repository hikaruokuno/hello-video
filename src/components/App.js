import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AuthMemberAdd from './AuthMemberAdd';
import AuthMemberEdit from './AuthMemberEdit';
import VideoList from './videos/VideoList';
import AuthVideoShow from './AuthVideoShow';
import Complete from './members/Complete';
import Header from './Heder';
import 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();
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
      </div>
    );
  }
}

export default App;
