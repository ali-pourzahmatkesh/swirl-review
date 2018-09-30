import Chats from "./Chats";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { getListData, callDeleteChat, setTabOfPage } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.auth.userData.id,
	list: state.app.chat.list,
	deleteChat: state.app.chat.deleteChat,
	currentTabOfPage: state.app.chat.currentTabOfPage
	// isLoadingFetch: state.app.chat.isLoadingFetch,
	// refreshing: state.app.chat.refreshing,
	// loading: state.app.chat.loading,
	// count: state.app.chat.count
});

const mapDispatchToProps = dispatch => ({
	getListData: (data, tab) => dispatch(getListData(data, tab)),
	callDeleteChat: data => dispatch(callDeleteChat(data)),
	setTabOfPage: tabName => dispatch(setTabOfPage(tabName))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Chats)
);
