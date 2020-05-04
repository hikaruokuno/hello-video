import youtube from '../apis/youtube';
import { SIGN_IN, SIGN_OUT } from './types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const selectVideo = (video) => {
  video;
  return {
    type: 'SELECTED_VIDEO',
    payload: video,
  };
};

// 非同期処理
// dispatch関数にActionオブジェクトを渡せばReducerに処理が映る
// termをステイトとしてReducerに定義する
export const fetchVideo = (term) => async (dispatch) => {
  const response = await youtube.get('/search', {
    params: {
      q: term,
    },
  });

  dispatch({ type: 'FETCH_VIDEO', payload: response.data });
};

export const nextPage = (term, nextPageToken) => async (dispatch) => {
  const response = await youtube.get('/search', {
    params: {
      q: term,
      pageToken: nextPageToken,
    },
  });
  dispatch({ type: 'FETCH_VIDEO', payload: response.data });
};

// Loginしたら、memberListを取得するfetchMemberを実行し、stateを更新する
export const fetchMember = (uid) => async (dispatch) => {
  const db = firebase.firestore();
  const lists = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('members')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        lists.push(doc.data());
      });
    });

  // 昇順に並べ替える
  lists.sort(function (a, b) {
    return a.sort - b.sort;
  });
  dispatch({ type: 'FETCH_MEMBER', payload: lists });
};

export const clearMember = () => {
  return { type: 'CLEAR_MEMBER', payload: [] };
};

export const signIn = () => {
  return {
    type: SIGN_IN,
  };
};

export const signOut = () => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT,
  };
};

export const selectedMember = (member) => {
  return {
    type: 'SELECTED_MEMBER',
    payload: member,
  };
};

export const selectedGroup = (group) => {
  return {
    type: 'SELECTED_GROUP',
    payload: group,
  };
};
