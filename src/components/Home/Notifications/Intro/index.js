import Intro from "./Intro";
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
const mapStateToProps = state => (
    {});

const mapDispatchToProps = dispatch => (
    {});
export default withNavigation(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Intro)
);
