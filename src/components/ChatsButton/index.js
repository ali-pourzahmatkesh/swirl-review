import ChatsButton from "./ChatsButton";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
	getListData,
	callDeleteChat
} from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.auth.userData.id,
	list: state.app.chat.list,
    deleteChat: state.app.chat.deleteChat
	// isLoadingFetch: state.app.chat.isLoadingFetch,
	// refreshing: state.app.chat.refreshing,
	// loading: state.app.chat.loading,
	// count: state.app.chat.count
});

const mapDispatchToProps = dispatch => ({
	getListData: data => dispatch(getListData(data)),
    callDeleteChat: data => dispatch(callDeleteChat(data))
});

export default withNavigation(
	connect(mapStateToProps, mapDispatchToProps)(ChatsButton)
);
