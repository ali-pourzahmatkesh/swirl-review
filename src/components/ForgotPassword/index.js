import ForgotPassword from "./ForgotPassword";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { sendVerifyCode } from "../../store/member";

const mapStateToProps = state => ({
	verifyCode: state.app.member.verifyCode
});

const mapDispatchToProps = dispatch => ({
	sendVerifyCode: cellphone => dispatch(sendVerifyCode(cellphone))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ForgotPassword)
);
