import Profile from "./Profile";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { callLogout, callGetProfile, updateMember } from "../../store/member";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	userProfile: state.app.member.userData,
	loadingUpdateAvatar: state.app.member.isLoadingFetch
});

const mapDispatchToProps = dispatch => {
	return {
		callLogout: data => dispatch(callLogout(data)),
		callGetProfile: id => dispatch(callGetProfile(id)),
		updateMember: data => dispatch(updateMember(data))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Profile)
);
