import youtube from '../apis/youtube';
import { SIGN_IN, SIGN_OUT } from './types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const selectVideo = video => {
  console.log(video);
  return {
    type: 'SELECTED_VIDEO',
    payload: video
  };
};

// 非同期処理
// dispatch関数にActionオブジェクトを渡せばReducerに処理が映る
// termをステイトとしてReducerに定義する
export const fetchVideo = term => async dispatch => {
  const response = await youtube.get('/search', {
    params: {
      q: term
    }
  });
  console.log(response.data);
  // for (var i = response.data.items.length - 1; i > 0; i--) {
  //   var j = Math.floor(Math.random() * (i + 1));
  //   var tmp = response.data.items[i];
  //   response.data.items[i] = response.data.items[j];
  //   response.data.items[j] = tmp;
  // }
  // selectedMember(term);
  dispatch({ type: 'FETCH_VIDEO', payload: response.data });
};

export const nextPage = (term, nextPageToken) => async dispatch => {
  const response = await youtube.get('/search', {
    params: {
      q: term,
      pageToken: nextPageToken
    }
  });
  console.log(response.data);

  dispatch({ type: 'FETCH_VIDEO', payload: response.data });
};

// Loginしたら、memberListを取得するfetchMemberを実行し、stateを更新する
export const fetchMember = uid => async dispatch => {
  const db = firebase.firestore();
  const lists = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('members')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        lists.push(doc.data());
      });
    });

  // 昇順に並べ替える
  lists.sort(function(a, b) {
    return a.sort - b.sort;
  });
  console.log('response', lists);
  dispatch({ type: 'FETCH_MEMBER', payload: lists });
};

export const clearMember = () => {
  return { type: 'CLEAR_MEMBER', payload: [] };
};

export const signIn = () => {
  // const provider = new firebase.auth.GoogleAuthProvider();

  // firebase.auth().signInWithRedirect(provider);
  return {
    type: SIGN_IN
  };
};
// export const signIn = () => async dispatch => {
//   const provider = new firebase.auth.GoogleAuthProvider();

//   await firebase.auth().signInWithRedirect(provider);
//   dispatch({ type: SIGN_IN });
// };

export const signOut = () => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  };
};

export const selectedMember = member => {
  console.log(member);
  return {
    type: 'SELECTED_MEMBER',
    payload: member
  };
};

export const selectedGroup = group => {
  console.log(group);
  return {
    type: 'SELECTED_GROUP',
    payload: group
  };
};
