import SignIn from "./SignIn";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { sendPassword, getIpData, getCountries } from "../../store/member";
import { finishEntry } from "../../store/app";
// import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	loading: state.app.member.loading,
	isLoadingFetch: state.app.member.loading,
	ipData: state.app.member.ipData,
	countries: state.app.member.countries,
	finishedEntry: state.app.appReducer.finishedEntry
});

const mapDispatchToProps = dispatch => ({
	sendPassword: data => dispatch(sendPassword(data)),
	getIpData: () =>
		setTimeout(() => {
			dispatch(getIpData());
		}, 1),
	getCountries: () => dispatch(getCountries()),
	finishEntry: () => dispatch(finishEntry())
	// showToast: message => dispatch(showToast(true, message))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignIn)
);
