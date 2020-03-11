// import { SIGN_IN, SIGN_OUT } from '../actions/types';

// const INITIAL_STATE = {
//   isSignedIn: null
// };

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case SIGN_IN:
//       return { ...state, isSignedIn: true };
//     case SIGN_OUT:
//       return { ...state, isSignedIn: false };
//     default:
//       return state;
//   }
// };

// authContainer.js
// ユーザーの認証状態によって、Heder表示を出し分けるため、の認証コンポーネント

import { connect } from 'react-redux';
import NavigationItem from '../components/test/NavigationItem';

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(NavigationItem);
