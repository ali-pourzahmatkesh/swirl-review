import Profile from "./Profile";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	callLogout,
	// updateGhostMode,
	// updateGhostModeNotification,
	callGetProfile
} from "../../store/member";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	userProfile: state.app.member.userData
	// ghostNotif: state.app.member.ghostNotif
});

const mapDispatchToProps = dispatch => {
	return {
		callLogout: data => dispatch(callLogout(data)),
		callGetProfile: id => dispatch(callGetProfile(id))
		// updateGhostMode: data => dispatch(updateGhostMode(data)),
		// updateGhostModeNotification: status =>
		// 	dispatch(updateGhostModeNotification(status))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Profile)
);
