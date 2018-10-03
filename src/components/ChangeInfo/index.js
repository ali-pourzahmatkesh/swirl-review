import ChangeInfo from "./ChangeInfo";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { updateMember } from "../../store/member";
import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	isLoadingFetch: state.app.member.isLoadingFetch,
	id: state.app.member.userData.id,
	username: state.app.member.userData.username
});

const mapDispatchToProps = dispatch => ({
	updateMember: data => dispatch(updateMember(data)),
	showToast: message => dispatch(showToast(true, message))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChangeInfo)
);
