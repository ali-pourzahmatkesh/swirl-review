import ImageCropPic from "./ImageCropPic";
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
    )(ImageCropPic)
);
