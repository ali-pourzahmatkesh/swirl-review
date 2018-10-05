import Home from "./Home";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { chatGetList } from "../../store/chat";

const mapStateToProps = state => ({
	id: state.app.member.userData.id,
	chatList: state.app.chat.list
});

const mapDispatchToProps = dispatch => {
	return {
		chatGetList: data => dispatch(chatGetList(data))
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
);
