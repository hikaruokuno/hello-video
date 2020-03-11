import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import videosReducer from './videosReducer';
import selectedVideoReducer from './selectedVideoReducer';
import authReducer from './authReducer';
import membersReducer from './membersReducer';
import selectedMember from './selectedMemberReducer';
import selectedGroup from './selectedGroupReducer';
import groupsReducer from './groupsReducer';

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  videos: videosReducer,
  selectedVideo: selectedVideoReducer,
  selectedMember: selectedMember,
  selectedGroup: selectedGroup,
  auth: authReducer,
  members: membersReducer,
  groups: groupsReducer
});
