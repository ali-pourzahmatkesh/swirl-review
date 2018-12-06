import React, {Component} from 'react';
import TermsAndConditions from '../components/TermsAndConditions';
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";
import {Text} from 'react-native';
import appCss from '../../app.css';

export default class TermsAndConditionsScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: <ProfileOptionHeader nav={navigation} title='Terms of Use'/>
        }
    };
    render() {
        return (
            <TermsAndConditions/>
        )
    }
}