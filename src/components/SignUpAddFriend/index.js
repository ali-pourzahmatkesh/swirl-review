import SignUpAddFriend from "./SignUpAddFriend";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
return{}
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignUpAddFriend)
);
