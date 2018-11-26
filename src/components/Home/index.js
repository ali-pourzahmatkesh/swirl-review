import Home from "./Home";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { chatGetList, visitMessage, chatSetStore } from "../../store/chat";
import { showToast } from "../../store/toast";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	chatList: state.app.chat.list,
	resorted: state.app.chat.resorted,
	chatListRefreshing: state.app.chat.refreshing,
	isNewMessage: state.app.chat.isNewMessage
});

const mapDispatchToProps = dispatch => {
	return {
		chatGetList: data => dispatch(chatGetList(data)),
		visitMessage: data => dispatch(visitMessage(data)),
		chatSetStore: data => dispatch(chatSetStore(data)),
		visitMessage: data => dispatch(visitMessage(data)),
		showToast: message => dispatch(showToast(true, message))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
);
