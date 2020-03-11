import { connect } from 'react-redux';
import MemberAdd from './members/MemberAdd';

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(MemberAdd);
