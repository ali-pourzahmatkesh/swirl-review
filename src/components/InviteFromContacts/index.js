import InviteFromContacts from "./InviteFromContacts";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
	getMembersAreInMyContactsThatNotFriend,
	doSearchInDB
} from "../../store/member";

import {
	callAddFriend,
	resetAddedIds
} from "../../store/friendRequest";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	membersFromContactsAreNotFriend:
		state.app.member.membersFromContactsAreNotFriend,
	loading: state.app.friendRequest.loading,
	loadType: state.app.friendRequest.loadType,
	actionTarget: state.app.friendRequest.actionTarget,
	hasError: state.app.friendRequest.hasError,
	successfullyAddedIds: state.app.friendRequest.successfullyAddedIds
});

const mapDispatchToProps = dispatch => ({
	getMembersAreInMyContactsThatNotFriend: data =>
		dispatch(getMembersAreInMyContactsThatNotFriend(data)),
	callAddFriend: data => dispatch(callAddFriend(data)),
	doSearchInDB: data => dispatch(doSearchInDB(data)),
	resetAddedIds: () => dispatch(resetAddedIds())
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(InviteFromContacts)
);
