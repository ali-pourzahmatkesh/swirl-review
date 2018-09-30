import Profile from "./Profile";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	callGetProfile,
	getListData,
	initialState,
	searchText,
	profileSetCloseModal,
	callProfileVisit,
	callVisitCount,
	updateInstagramToken,
	updateBio,
	updateGhostMode,
	updateGhostModeNotification
} from "../../store/profile";

import {
	initialStateFriendRequest,
	callCancelFriendship,
	callCancelRequestedFriendship,
	getFriendshipStatus,
	callAddFriend
} from "../../store/friendRequest";

import { callGetStatus } from "../../store/chat";

import {
	createNewSavedProfile,
	getListSavedProfile,
	callDeleteSavedProfile
} from "../../store/savedProfile";

import { setCurrentPage } from "../../store/app";

const mapStateToProps = state => ({
	user: state.app.auth.userData,
	userProfile: state.app.profile.userData,
	id: state.app.auth.userData.id,
	list: state.app.profile.list,
	isLoadingFetch: state.app.profile.isLoadingFetch,
	refreshing: state.app.profile.refreshing,
	loading: state.app.profile.loading,
	count: state.app.profile.count,
	closeModal: state.app.profile.closeModal,
	//navigateInviteContact: state.app.profile.navigateInviteContact,
	closeModalFromOther: state.app.profile.closeModalFromOther,
	visitCount: state.app.profile.visitCount,
	friendshipRequestStatus: state.app.friendRequest.friendshipRequestStatus,
	ghostNotif: state.app.profile.ghostNotif,
	listSavedProfile: state.app.savedProfile.listSavedProfile
});

const mapDispatchToProps = dispatch => ({
	callGetProfile: id => dispatch(callGetProfile(id)),
	getListData: data => dispatch(getListData(data)),
	searchText: text => dispatch(searchText(text)),
	initialState: () => dispatch(initialState()),
	initialStateFriendRequest: data => dispatch(initialStateFriendRequest(data)),
	callGetStatus: id => dispatch(callGetStatus(id)),
	profileSetCloseModal: data => dispatch(profileSetCloseModal(data)),
	callProfileVisit: data => dispatch(callProfileVisit(data)),
	callVisitCount: data => dispatch(callVisitCount(data)),
	updateInstagramToken: data => dispatch(updateInstagramToken(data)),
	callAddFriend: data => dispatch(callAddFriend(data)),
	callCancelFriendship: data => dispatch(callCancelFriendship(data)),
	callCancelRequestedFriendship: data =>
		dispatch(callCancelRequestedFriendship(data)),
	getFriendshipStatus: data => dispatch(getFriendshipStatus(data)),
	updateBio: data => dispatch(updateBio(data)),
	updateGhostMode: data => dispatch(updateGhostMode(data)),
	updateGhostModeNotification: status =>
		dispatch(updateGhostModeNotification(status)),
	createNewSavedProfile: data => dispatch(createNewSavedProfile(data)),
	getListSavedProfile: memberId => dispatch(getListSavedProfile(memberId)),
	callDeleteSavedProfile: id => dispatch(callDeleteSavedProfile(id)),
	setCurrentPage: pageName => dispatch(setCurrentPage(pageName))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Profile)
);
