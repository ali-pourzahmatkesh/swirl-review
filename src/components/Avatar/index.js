import Avatar from "./Avatar";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
// import { homeSetCloseModal } from "../../store/home";
// import { profileSetCloseModal } from "../../store/profile";

const mapStateToProps = state => ({
	hasInstagramToken:
		state.app.profile.userData && state.app.profile.userData.instagramToken
			? true
			: false
});

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
