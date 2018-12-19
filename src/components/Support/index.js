import Support from "./Support";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { callSendFeedBack } from "../../store/feedBack";

const mapStateToProps = state => ({
	memberOwner: state.app.member.userData.id,
	loading: state.app.feedback.loading
});

const mapDispatchToProps = dispatch => ({
	callSendFeedBack: data => dispatch(callSendFeedBack(data))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Support)
);
