import Home from "./Home";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { chatGetList, visitMessage } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	chatList: state.app.chat.list,
	chatListRefreshing: state.app.chat.refreshing
});

const mapDispatchToProps = dispatch => {
	return {
		chatGetList: data => dispatch(chatGetList(data)),
		visitMessage: data => dispatch(visitMessage(data))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
);
