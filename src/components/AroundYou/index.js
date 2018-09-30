import AroundYou from "./AroundYou";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { getListPeopleNearMe } from "../../store/aroundMe";
import { callGetProfile } from "../../store/profile";
// import { setCurrentPage } from "../../store/app";

const mapStateToProps = state => ({
	// currentPage: state.app.appReducer.currentPage,
	id: state.app.auth.userData.id,
	ListPeopleNearMe: state.app.aroundMe.ListPeopleNearMe,
	getListPeopleNearMeRefreshing:
		state.app.aroundMe.getListPeopleNearMeRefreshing,
	userProfile: state.app.profile.userData
});

const mapDispatchToProps = dispatch => ({
	getListPeopleNearMe: memberId => dispatch(getListPeopleNearMe(memberId)),
	callGetProfile: id => dispatch(callGetProfile(id))
	// setCurrentPage: pageName => dispatch(setCurrentPage(pageName))
});

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AroundYou)
);
