import ForgotPasswordVerify from "./ForgotPasswordVerify";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { showToast } from "../../store/toast";
import { updateCodeGetUser, sendUser } from "../../store/member";

const mapStateToProps = state => ({
	isLoadingFetch: state.app.member.isLoadingFetch,
	hasError: state.app.member.hasError
});

const mapDispatchToProps = dispatch => ({
	updateCodeGetUser: data => dispatch(updateCodeGetUser(data)),
	sendUser: data => dispatch(sendUser(data)),
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ForgotPasswordVerify)
);
