import ChangePassword from "./ChangePassword";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { changePassword } from "../../store/member";

const mapStateToProps = state => ({
	isLoadingFetch: state.app.member.isLoadingFetch,
})

const mapDispatchToProps = dispatch => ({
	changePassword: data => dispatch(changePassword(data))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChangePassword)
);
