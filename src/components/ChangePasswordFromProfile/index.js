import ChangePasswordFromProfile from "./ChangePasswordFromProfile";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { changePasswordFromProfile } from "../../store/member";

const mapStateToProps = state => ({
	id: state.app.member.userData.id
});

const mapDispatchToProps = dispatch => ({
	changePasswordFromProfile: data => dispatch(changePasswordFromProfile(data))
});

// export default withNavigation(ChangePasswordFromProfile);
export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChangePasswordFromProfile)
);
