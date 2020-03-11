import React from 'react';
import Login from '../Login';
import Logout from '../Logout';

const NavigationItem = props => {
  const { auth } = props;
  const authenticated = !auth.isEmpty;

  const renderAuthButton = user => {
    return <Login user={user} />;
  };

  const renderUserItem = () => {
    return <Logout />;
  };

  if (!auth.isLoaded) {
    return <div className="ui active inline loader"></div>;
  } else {
    return authenticated ? renderUserItem() : renderAuthButton(auth.uid);
  }
};

export default NavigationItem;
