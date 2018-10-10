import Home from "./Home";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { chatGetList, visitMessage, chatSetStore } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	chatList: state.app.chat.list,
	chatListRefreshing: state.app.chat.refreshing,
	isNewMessage: state.app.chat.isNewMessage
});

const mapDispatchToProps = dispatch => {
	return {
		chatGetList: data => dispatch(chatGetList(data)),
		visitMessage: data => dispatch(visitMessage(data)),
		chatSetStore: data => dispatch(chatSetStore(data))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
);
