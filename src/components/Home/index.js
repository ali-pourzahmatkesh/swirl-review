import Home from "./Home";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { chatGetList, visitMessage, chatSetStore } from "../../store/chat";
import { showToast } from "../../store/toast";
import {
	finishEntry,
	setNav
} from "../../store/app";
import {
	getListData,
} from "../../store/friendRequest";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	chatList: state.app.chat.list,
	friendRequests: state.app.friendRequest.list,
	resorted: state.app.chat.resorted,
	chatListRefreshing: state.app.chat.refreshing,
	isNewMessage: state.app.chat.isNewMessage,
	finishedEntry: state.app.appReducer.finishedEntry
});

const mapDispatchToProps = dispatch => {
	return {
		chatGetList: data => dispatch(chatGetList(data)),
		visitMessage: data => dispatch(visitMessage(data)),
		chatSetStore: data => dispatch(chatSetStore(data)),
		showToast: (message, messageData = null) => dispatch(showToast(true, message, messageData)),
		finishEntry: () => dispatch(finishEntry()),
		getListData: data => dispatch(getListData(data)),
		setNav: nav => dispatch(setNav(nav))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
);
