import SignIn from "./SignIn";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
// import { sendPassword } from "../../store/signInPassword";
import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	// isLoadingFetch: state.app.signInPassword.isLoadingFetch
});

const mapDispatchToProps = dispatch => ({
	// sendPassword: data => dispatch(sendPassword(data)),
	showToast: message => dispatch(showToast(true, message))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignIn)
);
