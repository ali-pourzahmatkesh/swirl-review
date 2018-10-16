import MessagePopup from "./MessagePopup";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { newMessage } from "../../store/chat";
import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	id: state.app.member.userData.id
});

const mapDispatchToProps = dispatch => {
	return {
		newMessage: data => dispatch(newMessage(data)),
		showToast: message => dispatch(showToast(true, message))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MessagePopup)
);
