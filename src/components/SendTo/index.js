import SendTo from "./SendTo";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { getMembersAreInMyContactsThatNotFriend } from "../../store/member";
// import { newMessage } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	membersFromContactsAreNotFriend:
		state.app.member.membersFromContactsAreNotFriend
});

const mapDispatchToProps = dispatch => ({
	getMembersAreInMyContactsThatNotFriend: data =>
		dispatch(getMembersAreInMyContactsThatNotFriend(data))
	// newMessage: data => dispatch(newMessage(data))
});
export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SendTo)
);
