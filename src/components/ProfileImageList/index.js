import ProfileImageList from "./ProfileImageList";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { getInstagramFeed, resetInstagramFeed } from "../../store/profile";
const mapStateToProps = state => ({
	instagramFeed: state.app.profile.instagramFeed
});

const mapDispatchToProps = dispatch => ({
	getInstagramFeed: instagramToken =>
		dispatch(getInstagramFeed(instagramToken)),
	resetInstagramFeed: () => dispatch(resetInstagramFeed())
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProfileImageList)
);
