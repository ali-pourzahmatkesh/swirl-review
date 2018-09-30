import Discussion from "./Discussion";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	callChatList,
	callSendChat,
	chatRequestResponse
} from "../../store/Discussion";
import { callGetStatus, getListData } from "../../store/chat";
import { getFriendshipStatus } from "../../store/friendRequest";
import { blockMember, setRedirectBack } from "../../store/member";

const mapStateToProps = state => {
	return {
		memberOwner: state.app.auth.userData.id,
		chatList: state.app.discussion.chatList,
		redirectBack: state.app.member.redirectBack,
		friendRequest: state.app.friendRequest,
		currentTabOfPage: state.app.chat.currentTabOfPage
	};
};

const mapDispatchToProps = dispatch => ({
	callChatList: data => dispatch(callChatList(data)),
	callSendChat: data => dispatch(callSendChat(data)),
	getFriendshipStatus: data => dispatch(getFriendshipStatus(data)),
	callGetStatus: data => dispatch(callGetStatus(data)),
	chatRequestResponse: data => dispatch(chatRequestResponse(data)),
	// blockMember: data => dispatch(blockMember(data)),
	getListData: data => dispatch(getListData(data)),
	setRedirectBack: status => dispatch(setRedirectBack(status))
});

// export default withNavigation(
// 	connect(
// 		mapStateToProps,
// 		mapDispatchToProps
// 	)(Discussion)
// );
export default Discussion
