import { connect } from 'react-redux';
import MemberEdit from './members/MemberEdit';

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(MemberEdit);
