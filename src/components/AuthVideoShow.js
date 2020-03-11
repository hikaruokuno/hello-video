import { connect } from 'react-redux';
import VideoShow from './videos/VideoShow';

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(VideoShow);
