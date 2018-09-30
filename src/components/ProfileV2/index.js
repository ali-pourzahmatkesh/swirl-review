import ProfileV2 from './ProfileV2';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { callLogout} from "../../store/auth";
import {
    updateGhostMode,
	updateGhostModeNotification,
	callGetProfile,
} from "../../store/profile";

const mapStateToProps = state => ({
	id: state.app.auth.userData.id,
	userProfile: state.app.profile.userData,
	ghostNotif: state.app.profile.ghostNotif,
});

const mapDispatchToProps = dispatch => {
	return {
		callLogout: data => dispatch(callLogout(data)),
		callGetProfile: id => dispatch(callGetProfile(id)),
        updateGhostMode: data => dispatch(updateGhostMode(data)),
        updateGhostModeNotification: status =>
		dispatch(updateGhostModeNotification(status)),
	};
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ProfileV2));