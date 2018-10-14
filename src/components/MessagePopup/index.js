import MessagePopup from "./MessagePopup";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { newMessage } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.member.userData.id
});

const mapDispatchToProps = dispatch => {
	return {
		newMessage: data => dispatch(newMessage(data))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MessagePopup)
);
