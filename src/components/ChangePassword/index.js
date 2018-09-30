import ChangePassword from "./ChangePassword";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
// import { changePassword } from "../../store/confirmPassword";

const mapDispatchToProps = dispatch => ({
	// changePassword: data => dispatch(changePassword(data))
});

// export default withNavigation(ChangePassword);
export default withNavigation(
	connect(
		null,
		mapDispatchToProps
	)(ChangePassword)
);
