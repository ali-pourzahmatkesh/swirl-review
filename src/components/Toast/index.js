import Toast from './Toast';
import { connect } from 'react-redux';
import {hideToast, showToast} from '../../store/toast';

const mapStateToProps = state => {
    return {
        hasError: state.app.toast.hasError,
        errorMessage: state.app.toast.errorMessage
    };
}

const mapDispatchToProps = dispatch => ({
    hideToast: () => dispatch(hideToast()),
    showToast: message => dispatch(showToast(true, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);