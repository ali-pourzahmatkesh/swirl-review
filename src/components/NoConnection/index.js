import NoConnection from './NoConnection';
import { connect } from 'react-redux';
import {hideToast} from '../../store/toast';

const mapDispatchToProps = dispatch => ({
    hideToast: () => dispatch(hideToast())
});


export default connect(null, mapDispatchToProps)(NoConnection);