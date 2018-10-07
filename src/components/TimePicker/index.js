import Avatar from "./Avatar";
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
	)(Avatar)
);
