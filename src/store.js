import { createStore, combineReducers, applyMiddleware } from 'redux';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import { firestoreReducer, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

export const store = createStore(reducers, applyMiddleware(...middlewares));
