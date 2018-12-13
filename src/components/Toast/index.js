import Toast from './Toast';
import { connect } from 'react-redux';
import {hideToast, showToast} from '../../store/toast';
import { visitMessage } from "../../store/chat";
import { friendRequestFromToast } from "../../store/app";

const mapStateToProps = state => {
    return {
        hasError: state.app.toast.hasError,
        errorMessage: state.app.toast.errorMessage,
        messageData: state.app.toast.messageData,
        nav: state.app.appReducer.nav
    };
}

const mapDispatchToProps = dispatch => ({
    hideToast: () => dispatch(hideToast()),
    showToast: message => dispatch(showToast(true, message)),
    visitMessage: data => dispatch(visitMessage(data)),
    friendRequestFromToast: data => dispatch(friendRequestFromToast(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);