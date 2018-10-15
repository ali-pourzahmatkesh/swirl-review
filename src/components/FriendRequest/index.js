import FriendRequest from "./FriendRequest";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	getListData,
	callApprove,
	callCancel
} from "../../store/friendRequest";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	list: state.app.friendRequest.list,
	// deleteChat: state.app.chat.deleteChat,
	// isLoadingFetch: state.app.friendRequest.isLoadingFetch,
	// refreshing: state.app.friendRequest.refreshing,
	loading: state.app.friendRequest.loading
	// count: state.app.friendRequest.count
});

const mapDispatchToProps = dispatch => ({
	getListData: data => dispatch(getListData(data)),
	callApprove: id => dispatch(callApprove(id)),
	callCancel: id => dispatch(callCancel(id))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(FriendRequest)
);
