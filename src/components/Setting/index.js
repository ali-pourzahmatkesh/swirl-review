import Setting from "./Setting";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { callLogout, callDeleteAccount } from "../../store/auth";
import { updateGhostMode } from "../../store/profile";

const mapStateToProps = state => ({
	id: state.app.auth.userData.id,
	userProfile: state.app.profile.userData
});

const mapDispatchToProps = dispatch => {
	return {
		callLogout: data => dispatch(callLogout(data)),
		callDeleteAccount: id => dispatch(callDeleteAccount(id)),
		updateGhostMode: data => dispatch(updateGhostMode(data))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Setting)
);
