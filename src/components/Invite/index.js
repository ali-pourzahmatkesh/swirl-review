import Invite from "./Invite";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
// import { homeSetCloseModal } from "../../store/home";
// import { profileSetCloseModal } from "../../store/profile";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	// homeSetCloseModal: data => dispatch(homeSetCloseModal(data)),
	// profileSetCloseModal: data => dispatch(profileSetCloseModal(data))
});
export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Invite)
);
