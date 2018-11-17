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
	loading: state.app.friendRequest.loading,
	loadType: state.app.friendRequest.loadType,
	actionTarget: state.app.friendRequest.actionTarget,
	hasError: state.app.friendRequest.hasError
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
