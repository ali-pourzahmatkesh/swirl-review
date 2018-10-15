import SendTo from "./SendTo";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { getFriends } from "../../store/member";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	membersThatAreFriends: state.app.member.membersThatAreFriends
});

const mapDispatchToProps = dispatch => ({
	getFriends: data => dispatch(getFriends(data))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SendTo)
);
