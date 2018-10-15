import InviteFromContacts from "./InviteFromContacts";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { getMembersAreInMyContactsThatNotFriend } from "../../store/member";

import { callAddFriend } from "../../store/friendRequest";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	membersFromContactsAreNotFriend:
		state.app.member.membersFromContactsAreNotFriend
});

const mapDispatchToProps = dispatch => ({
	getMembersAreInMyContactsThatNotFriend: data =>
		dispatch(getMembersAreInMyContactsThatNotFriend(data)),
	callAddFriend: data => dispatch(callAddFriend(data))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(InviteFromContacts)
);
