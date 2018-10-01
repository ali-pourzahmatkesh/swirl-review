import ForgotPassword from "./ForgotPassword";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	sendVerifyCode,
	sendPassword,
	getIpData,
	getCountries
} from "../../store/member";

const mapStateToProps = state => ({
	verifyCode: state.app.member.verifyCode,
	isLoadingFetch: state.app.member.isLoadingFetch,
	ipData: state.app.member.ipData,
	countries: state.app.member.countries
});

const mapDispatchToProps = dispatch => ({
	sendVerifyCode: cellphone => dispatch(sendVerifyCode(cellphone)),
	getIpData: () =>
		setTimeout(() => {
			dispatch(getIpData());
		}, 1),
	getCountries: () => dispatch(getCountries()),
	showToast: message => dispatch(showToast(true, message))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ForgotPassword)
);
