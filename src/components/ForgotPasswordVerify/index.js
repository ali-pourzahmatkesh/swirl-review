import ForgotPasswordVerify from "./ForgotPasswordVerify";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { showToast } from "../../store/toast";
import { updateCodeGetUser } from "../../store/member";

const mapStateToProps = state => ({
	loading: state.app.member.loading
});

const mapDispatchToProps = dispatch => ({
	updateCodeGetUser: data => dispatch(updateCodeGetUser(data))
});

export default withNavigation(
	connect(
		null,
		mapDispatchToProps
	)(ForgotPasswordVerify)
);
