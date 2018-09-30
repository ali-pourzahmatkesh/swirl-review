import SavedProfile from "./SavedProfile";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	getListSavedProfile,
	callDeleteSavedProfile
} from "../../store/savedProfile";

const mapStateToProps = state => ({
	id: state.app.auth.userData.id,
	listSavedProfile: state.app.savedProfile.listSavedProfile,
	getListSavedProfileRefreshing:
		state.app.savedProfile.getListSavedProfileRefreshing
});

const mapDispatchToProps = dispatch => ({
	getListSavedProfile: memberId => dispatch(getListSavedProfile(memberId)),
	callDeleteSavedProfile: id => dispatch(callDeleteSavedProfile(id))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SavedProfile)
);
