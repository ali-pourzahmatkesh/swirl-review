import FriendRequest from "./FriendRequest";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	initialStateFriendRequest,
	callApprove,
	callCancel
} from "../../store/friendRequest";

import { getListData, callDeleteChat } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.auth.userData.id,
	//list: state.app.friendRequest.list,
	list: state.app.chat.list,
	deleteChat: state.app.chat.deleteChat,
	isLoadingFetch: state.app.friendRequest.isLoadingFetch,
	refreshing: state.app.friendRequest.refreshing,
	loading: state.app.friendRequest.loading,
	count: state.app.friendRequest.count
});

const mapDispatchToProps = dispatch => ({
	getListData: (data, tab) => dispatch(getListData(data, tab)),
	callDeleteChat: data => dispatch(callDeleteChat(data)),
	initialStateFriendRequest: () => dispatch(initialStateFriendRequest()),
	callApprove: id => dispatch(callApprove(id)),
	callCancel: id => dispatch(callCancel(id))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(FriendRequest)
);
