import SocketWatcher from "./SocketWatcher";
import { connect } from "react-redux";
import {
	chatReceiveNewMessage
} from "../../store/chat";
import {
	getListData
} from "../../store/friendRequest";
import { showToast } from "../../store/toast";
// import { socketVisitCount } from "../../store/profile";
// import { updatePersonNearMe, addNotificationToStack } from "../../store/home";
// import { chatReceiveNewMessage } from "../../store/Discussion";
// import {
// 	getListData as getListOfFriendRequests,
// 	getFriendshipStatus
// } from "../../store/friendRequest";

const mapStateToProps = state => {
	return {
		isLogin: state.app.member.isLogin,
		id: state.app.member.userData.id
		// currentTabOfPage: state.app.chat.currentTabOfPage
		// currentPage: state.app.appReducer.currentPage
	};
};

const mapDispatchToProps = dispatch => ({
	// addChatCount: () => dispatch(addChatCount()),
	// hasFriendShipRequest: () => dispatch(hasFriendShipRequest()),
	// socketVisitCount: data => dispatch(socketVisitCount(data)),
	// updatePersonNearMe: data => dispatch(updatePersonNearMe(data)),
	chatReceiveNewMessage: data => dispatch(chatReceiveNewMessage(data)),
	// getListData: (data, tab) => dispatch(getListData(data, tab)),
	// callGetStatus: userId => dispatch(callGetStatus(userId)),
	// getListOfFriendRequests: data => dispatch(getListOfFriendRequests(data)),
	// getFriendshipStatus: data => dispatch(getFriendshipStatus(data)),
	// addNotificationToStack: data => dispatch(addNotificationToStack(data))
	showToast: (message, messageData = null) => dispatch(showToast(true, message, messageData)),
	getListData: data => dispatch(getListData(data)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SocketWatcher);
