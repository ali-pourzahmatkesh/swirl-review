import SendTo from "./SendTo";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { getMembersAreInMyContactsThatNotFriend } from "../../store/member";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	membersFromContactsAreNotFriend:
		state.app.member.membersFromContactsAreNotFriend
});

const mapDispatchToProps = dispatch => ({
	getMembersAreInMyContactsThatNotFriend: data =>
		dispatch(getMembersAreInMyContactsThatNotFriend(data))
});
export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SendTo)
);
