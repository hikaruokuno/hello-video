import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config/firebase-config';
// import 'firebase/firestore' // <- needed if using firestore
import { store } from './store';
import App from './components/App';
// import reducers from './reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

firebase.initializeApp(firebaseConfig);

firebase.firestore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.querySelector('#root')
);
