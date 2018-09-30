import Toast from './Toast';
import { connect } from 'react-redux';
import {hideToast} from '../../store/toast';

const mapStateToProps = state => ({
    hasError: state.app.toast.hasError,
    errorMessage: state.app.toast.errorMessage
});

const mapDispatchToProps = dispatch => ({
    hideToast: () => dispatch(hideToast())
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);