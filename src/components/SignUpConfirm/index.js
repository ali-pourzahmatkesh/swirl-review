import SignUpConfirm from "./SignUpConfirm";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
// import { getVerifyCode, resendVerifyCode } from '../../store/signUpConfirm';
// import {sendPassword} from '../../store/signUpLevel6';
import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	currentMember: state.app.signUpConfirm.currentMember,
	verifyCode: state.app.signUpConfirm.verifyCode,
	isLoadingFetch: state.app.signUpConfirm.isLoadingFetch
});

const mapDispatchToProps = dispatch => ({
	// getVerifyCode: memberId => dispatch(getVerifyCode(memberId)),
	// sendPassword: data => dispatch(sendPassword(data)),
	showToast: message => dispatch(showToast(true, message))
	// resendVerifyCode: (cellphone) => dispatch(resendVerifyCode(cellphone))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignUpConfirm)
);

// export default withNavigation(SignUpConfirm);