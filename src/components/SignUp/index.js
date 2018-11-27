import SignUp from "./SignUp";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { sendUser, getIpData, getCountries } from "../../store/member";
// import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	loading: state.app.member.loading,
	isLoadingFetch: state.app.member.isLoadingFetch,
	ipData: state.app.member.ipData,
	countries: state.app.member.countries,
	userData: state.app.member.userData
});

const mapDispatchToProps = dispatch => ({
	sendUser: data => dispatch(sendUser(data)),
	getIpData: () => dispatch(getIpData()),
	getCountries: () => dispatch(getCountries()),
	// showToast: message => dispatch(showToast(true, message))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignUp)
);
