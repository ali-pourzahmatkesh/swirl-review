import SignUpAddFriend from "./SignUpAddFriend";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

const mapStateToProps = state => ({
	membersFromContactsAreNotFriend:
		state.app.member.membersFromContactsAreNotFriend,
	successfullyAddedIds: state.app.friendRequest.successfullyAddedIds
});

const mapDispatchToProps = dispatch => {
	return {};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignUpAddFriend)
);
