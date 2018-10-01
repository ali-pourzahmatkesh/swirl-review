import SignIn from "./SignIn";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { sendPassword, getIpData, getCountries } from "../../store/member";
import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	isLoadingFetch: state.app.member.isLoadingFetch,
	ipData: state.app.member.ipData,
	countries: state.app.member.countries
});

const mapDispatchToProps = dispatch => ({
	sendPassword: data => dispatch(sendPassword(data)),
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
	)(SignIn)
);