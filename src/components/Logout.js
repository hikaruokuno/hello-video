import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchMember,
  clearMember,
  fetchVideo,
  selectedMember
} from '../actions';
import firebase from 'firebase/app';
import { randomOg } from '../reducers/groupsReducer';

const Logout = props => {
  useEffect(() => {
    // props.fetchMember(props.firebase.auth.uid);
    const test = async () => {
      console.log('fetchMember実行');
      await props.fetchMember(props.firebase.auth.uid);
      console.log('fetchMember終了', props);
      // ちゃんと非同期になっているが、membersが存在しない・・・なぜだ・・・
    };

    const awaitTestFetchVideo = async () => {
      await test();
      console.log('testメソッド終了', props);
    };
    awaitTestFetchVideo();

    // props.fetchVideo(props.members[0].name);
    // TODO:ここでfetchVideoを実行して、ログイン後１推しを表示させたい
    // fetchMemberでMemberList取得前にfetchVideoが実施されてしまう
    // firebaseから直接取得する？
    // VideoShowとLogoutコンポーネントどちらが先か見てみよう
    // そもそもVideoShowがdidmountで判断してるからいけない？
    // 関数コンポーネントにしてみる？
    // VideoShowは再レンダリングされていない
    // されるようになれば、達成できる
    // testメソッド終了後にfetchVideo実行すればいいんだ！
    // ↑の関数を用意する。
    // だめだ、testメソッド終了後に実施してもmembersの中身はなにもない・・・なぜ・・・
  }, []);

  console.log(props);
  const googleSignOut = () => {
    console.log('logout', props);
    firebase.auth().signOut();
    props.clearMember();
    props.fetchVideo(randomOg());
    props.selectedMember();
  };

  return (
    <Button onClick={googleSignOut} color="inherit" to="/" component={Link}>
      ログアウト
    </Button>
  );
};

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    members: state.members
  };
};

export default connect(mapStateToProps, {
  fetchMember,
  clearMember,
  fetchVideo,
  selectedMember
})(Logout);
